import numpy as np
import pandas as pd
import pytorch_lightning as pl
from pytorch_lightning.callbacks import EarlyStopping, LearningRateMonitor
from pytorch_forecasting import TemporalFusionTransformer, TimeSeriesDataSet
from pytorch_forecasting.data import GroupNormalizer
from pytorch_forecasting.metrics import QuantileLoss
import tensorflow as tf
import tensorboard as tb

tf.io.gfile = tb.compat.tensorflow_stub.io.gfile

class TFT:
    def __init__(self, standart, data):
        self.rooms = standart.rooms
        self.standart = standart
        self.data_prep = self.prepare_data_to_predict(data)
        self.model = self.zdorovaya_dura(self.data_prep, 1, 3)
        self.predict = self.model.predict(self.data_prep).detach().numpy()

    def prepare_data_to_predict(self, df):
        data = df.copy()
        data = self.find_nearest_objects(data)
        data_prep = pd.DataFrame()
        data_prep['price'] = data.price
        data_prep['time_id'] = range(1, len(data) + 1)
        data_prep['id'] = str(self.rooms)
        return data_prep

    def find_nearest_objects(self, data):
        standart = self.standart
        data['rooms'] = data['rooms']
        standart['rooms'] = str(standart['rooms'])
        data = data[data['rooms'] == standart['rooms']]
        dataframe = pd.DataFrame()
        dataframe['idk'] = data['idk']
        dataframe['compare'] = 10 * (abs(standart['area'] - data['area'].astype(float))) + \
                               5 * (abs(abs(standart['floors'] - standart['floor']) - abs(
            data['floors'] - data['floor']).astype(float))) + 0.000025 * (abs(standart['price'] - data['price']))
        data_to_pred = dataframe.sort_values('compare').merge(data, how='inner', on='idk').head(300).groupby(
            ['year', 'month']).aggregate({'price': 'mean'})
        return data_to_pred

    def zdorovaya_dura(self, all_data_w_d, batch_size, max_prediction_length=3):
        training = TimeSeriesDataSet(
            data=all_data_w_d,
            time_idx='time_id',
            target='price',
            group_ids=['id'],
            add_relative_time_idx=True,
            add_target_scales=True,
            static_categoricals=['id'],
            time_varying_known_reals=["time_id"],
            time_varying_unknown_reals=[
                'price'
            ],
            max_prediction_length=max_prediction_length,
            min_encoder_length=1,
            target_normalizer=GroupNormalizer(
                groups=['id'], transformation="softplus"
            ),
        )

        validation = TimeSeriesDataSet.from_dataset(training, all_data_w_d
                                                    , predict=True, stop_randomization=True)
        train_dataloader = training.to_dataloader(train=True, batch_size=batch_size, num_workers=0)
        val_dataloader = validation.to_dataloader(train=False
                                                  , batch_size=batch_size * 10, num_workers=0)

        lr_logger = LearningRateMonitor()
        early_stop_callback = EarlyStopping(monitor="val_loss", min_delta=1e-4
                                            , patience=10, verbose=False, mode="min")

        trainer = pl.Trainer(
            max_epochs=15,
            gpus=0,
            enable_model_summary=True,
            gradient_clip_val=0.1,
            limit_train_batches=30,
            callbacks=[lr_logger, early_stop_callback],
        )

        tft = TemporalFusionTransformer.from_dataset(
            training,
            learning_rate=0.01,
            hidden_size=16,
            attention_head_size=1,
            dropout=0.1,
            hidden_continuous_size=8,
            loss=QuantileLoss(),
            log_interval=10,
            output_size=7,
            reduce_on_plateau_patience=4,
        )

        trainer.fit(
            tft,
            train_dataloaders=train_dataloader,
            val_dataloaders=val_dataloader,
        )
        return tft
