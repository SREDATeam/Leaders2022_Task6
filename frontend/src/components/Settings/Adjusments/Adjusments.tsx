import { Button, InputNumber } from "antd";
import { useState } from "react";
import classes from "./Adjusments.module.scss";

const floorMatrix = {
  first1_mid2: "-7.0",
  first1_last2: "-3.1",
  mid1_first2: "7.5",
  mid1_last2: "4.2",
  last1_first2: "3.2",
  last1_mid2: "-4.0",
};

const mainAreaMatrix = {
  XS1_S2: "6",
  XS1_M2: "14",
  XS1_L2: "21",
  XS1_XL2: "28",
  XS1_XXL2: "31",
  S1_XS2: "-6",
  S1_M2: "7",
  S1_L2: "14",
  S1_XL2: "21",
  S1_XXL2: "24",
  M1_XS2: "-12",
  M1_S2: "-7",
  M1_L2: "6",
  M1_XL2: "13",
  M1_XXL2: "16",
  L1_XS2: "-17",
  L1_S2: "-12",
  L1_M2: "-6",
  L1_XL2: "6",
  L1_XXL2: "9",
  XL1_XS2: "-22",
  XL1_S2: "-17",
  XL1_M2: "-11",
  XL1_L2: "-6",
  XL1_XXL2: "3",
  XXL1_XS2: "-24",
  XXL1_S2: "-19",
  XXL1_M2: "-13",
  XXL1_L2: "-8",
  XXL1_XL2: "-3",
};

const kitchenAreaMatrix = {
  S1_M2: "-2.9",
  S1_L2: "-8.3",
  M1_S2: "3.0",
  M1_L2: "-5.5",
  L1_S2: "9.0",
  L1_M2: "5.8",
};

const balconyMatrix = {
  N1_Y2: "-5.0",
  Y1_N2: "5.3",
};

const metroDistanseMatrix = {
  XS1_S2: "7",
  XS1_M2: "12",
  XS1_L2: "17",
  XS1_XL2: "24",
  XS1_XXL2: "29",
  S1_XS2: "-7",
  S1_M2: "4",
  S1_L2: "9",
  S1_XL2: "15",
  S1_XXL2: "20",
  M1_XS2: "-11",
  M1_S2: "-4",
  M1_L2: "5",
  M1_XL2: "11",
  M1_XXL2: "15",
  L1_XS2: "-15",
  L1_S2: "-8",
  L1_M2: "-5",
  L1_XL2: "6",
  L1_XXL2: "10",
  XL1_XS2: "-19",
  XL1_S2: "-13",
  XL1_M2: "-10",
  XL1_L2: "-6",
  XL1_XXL2: "4",
  XXL1_XS2: "-22",
  XXL1_S2: "-17",
  XXL1_M2: "-13",
  XXL1_L2: "-9",
  XXL1_XL2: "-3",
};

const conditionMatrix = {
  N1_E2: "-13400",
  N1_Y2: "-20100",
  E1_N2: "13400",
  E1_Y2: "-6700",
  Y1_N2: "20100",
  Y1_E2: "6700",
};

function getPersentInput(
  matrix,
  devValue: string,
  name: string,
  quality: string,
) {
  return (
    <InputNumber
      className={classes.persent_input}
      name={name}
      bordered={false}
      size={"small"}
      min="-100"
      max="100"
      step={quality}
      stringMode
      formatter={(value) => `${value}%`}
      defaultValue={devValue}
      onChange={(e) => (matrix[name] = e)}
    />
  );
}
function getNumInput(matrix, devValue: string, name: string) {
  return (
    <InputNumber
      className={classes.num_input}
      name={name}
      bordered={false}
      size={"small"}
      step={"100"}
      stringMode
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      defaultValue={devValue}
      onChange={(e) => (matrix[name] = e)}
    />
  );
}

export const Adjusments = () => {
  const [formState, setFormState] = useState(false);

  const getPersentCellNode = (matrix, name: string, quality: string) => {
    return (
      <div className={classes[name]} key={name}>
        {formState
          ? getPersentInput(matrix, matrix[name], name, quality)
          : matrix[name] + "%"}
      </div>
    );
  };

  const getNumCellNode = (matrix, name: string, quality: string) => {
    return (
      <div className={classes[name]} key={name}>
        {formState
          ? getNumInput(matrix, matrix[name], name, quality)
          : matrix[name].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
    );
  };

  const getFloorMatrixNode = (matrix) => {
    return (
      <>
        <div className={classes.floor_matrix}>
          <div className={classes.name}>
            <span>Этаж расположения квартиры</span>
          </div>
          <div className={classes.estimation_obgect}>
            <span>Объект оценки</span>
          </div>

          <div className={classes.analog_obgect}>Объект аналог</div>
          <div className={classes.first_floor_1}>Первый этаж</div>
          <div className={classes.mid_floors_1}>Средние этажи</div>
          <div className={classes.last_floor_1}>Последний этаж</div>
          <div className={classes.first_floor_2}>Первый этаж</div>
          <div className={classes.mid_floors_2}>Средние этажи</div>
          <div className={classes.last_floor_2}>Последний этаж</div>

          <div className={classes.f1_f2}>0,0%</div>
          <div className={classes.m1_m2}>0,0%</div>
          <div className={classes.l1_l2}>0,0%</div>

          {Object.keys(matrix).map((key) =>
            getPersentCellNode(matrix, key, "0.1"),
          )}
        </div>
      </>
    );
  };

  const getKitchenAreaMatrixNode = (matrix) => {
    return (
      <>
        <div className={classes.kitchen_area_matrix}>
          <div className={classes.name}>
            <span>Площадь кухни {"(кв.м.)"}</span>
          </div>
          <div className={classes.estimation_obgect}>
            <span>Объект оценки</span>
          </div>

          <div className={classes.analog_obgect}>Объект аналог</div>
          <div className={classes.S_1}>до 7</div>
          <div className={classes.M_1}>7-10</div>
          <div className={classes.L_1}>10-15</div>
          <div className={classes.S_2}>до 7</div>
          <div className={classes.M_2}>7-10</div>
          <div className={classes.L_2}>10-15</div>

          <div className={classes.S1_S2}>0,0%</div>
          <div className={classes.M1_M2}>0,0%</div>
          <div className={classes.L1_L2}>0,0%</div>

          {Object.keys(matrix).map((key) =>
            getPersentCellNode(matrix, key, "0.1"),
          )}
        </div>
      </>
    );
  };

  const getMainAreaMatrixNode = (matrix) => {
    return (
      <>
        <div className={classes.main_area_matrix}>
          <div className={classes.name}>
            <span>Площадь квартиры {"(кв.м.)"}</span>
          </div>
          <div className={classes.estimation_obgect}>
            <span>Объект оценки</span>
          </div>
          <div className={classes.analog_obgect}>Объект аналог</div>
          <div className={classes.XS_1}>{"<30"}</div>
          <div className={classes.S_1}>30-50</div>
          <div className={classes.M_1}>50-60</div>
          <div className={classes.L_1}>65-90</div>
          <div className={classes.XL_1}>90-120</div>
          <div className={classes.XXL_1}>{">120"}</div>
          <div className={classes.XS_2}>{"<30"}</div>
          <div className={classes.S_2}>30-50</div>
          <div className={classes.M_2}>50-60</div>
          <div className={classes.L_2}>65-90</div>
          <div className={classes.XL_2}>90-120</div>
          <div className={classes.XXL_2}>{">120"}</div>

          <div className={classes.XS1_XS2}>0,0%</div>
          <div className={classes.S1_S2}>0,0%</div>
          <div className={classes.M1_M2}>0,0%</div>
          <div className={classes.L1_L2}>0,0%</div>
          <div className={classes.XL1_XL2}>0,0%</div>
          <div className={classes.XXL1_XXL2}>0,0%</div>

          {Object.keys(matrix).map((key) =>
            getPersentCellNode(matrix, key, "1"),
          )}
        </div>
      </>
    );
  };

  const getBalconyMatrixNode = (matrix) => {
    return (
      <>
        <div className={classes.balcony_matrix}>
          <div className={classes.name}>
            <span>Наличие балкона/лоджии</span>
          </div>
          <div className={classes.estimation_obgect}>
            <span>Объект оценки</span>
          </div>

          <div className={classes.analog_obgect}>Объект аналог</div>
          <div className={classes.N_1}>Нет</div>
          <div className={classes.Y_1}>Есть</div>
          <div className={classes.N_2}>Нет</div>
          <div className={classes.Y_2}>Есть</div>

          <div className={classes.N1_N2}>0,0%</div>
          <div className={classes.Y1_Y2}>0,0%</div>

          {Object.keys(matrix).map((key) =>
            getPersentCellNode(matrix, key, "0.1"),
          )}
        </div>
      </>
    );
  };

  const getMetroDistanseMatrixNode = (matrix) => {
    return (
      <>
        <div className={classes.main_area_matrix}>
          <div className={classes.name}>
            <span>Удаленность от метро {"(мин./пешком)"}</span>
          </div>
          <div className={classes.estimation_obgect}>
            <span>Объект оценки</span>
          </div>
          <div className={classes.analog_obgect}>Объект аналог</div>
          <div className={classes.XS_1}>до 5</div>
          <div className={classes.S_1}>5-10</div>
          <div className={classes.M_1}>10-15</div>
          <div className={classes.L_1}>15-30</div>
          <div className={classes.XL_1}>30-60</div>
          <div className={classes.XXL_1}>60-90</div>
          <div className={classes.XS_2}>до 5</div>
          <div className={classes.S_2}>5-10</div>
          <div className={classes.M_2}>10-15</div>
          <div className={classes.L_2}>15-30</div>
          <div className={classes.XL_2}>30-60</div>
          <div className={classes.XXL_2}>60-90</div>

          <div className={classes.XS1_XS2}>0,0%</div>
          <div className={classes.S1_S2}>0,0%</div>
          <div className={classes.M1_M2}>0,0%</div>
          <div className={classes.L1_L2}>0,0%</div>
          <div className={classes.XL1_XL2}>0,0%</div>
          <div className={classes.XXL1_XXL2}>0,0%</div>

          {Object.keys(matrix).map((key) =>
            getPersentCellNode(matrix, key, "1"),
          )}
        </div>
      </>
    );
  };

  const getConditionMatrixNode = (matrix) => {
    return (
      <>
        <div className={classes.condition_matrix}>
          <div className={classes.name}>
            <span>Состояние отделки</span>
          </div>
          <div className={classes.estimation_obgect}>
            <span>Объект оценки</span>
          </div>

          <div className={classes.analog_obgect}>Объект аналог</div>
          <div className={classes.N_1}>Нет</div>
          <div className={classes.E_1}>Эконом</div>
          <div className={classes.Y_1}>Улучшеный</div>
          <div className={classes.N_2}>Нет</div>
          <div className={classes.E_2}>Эконом</div>
          <div className={classes.Y_2}>Улучшеный</div>

          <div className={classes.N1_N2}>0</div>
          <div className={classes.E1_E2}>0</div>
          <div className={classes.Y1_Y2}>0</div>

          {Object.keys(matrix).map((key) => getNumCellNode(matrix, key, "0.1"))}
        </div>
      </>
    );
  };

  return (
    <div className={classes.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(mainAreaMatrix);
          console.log(floorMatrix);
        }}
      >
        {getFloorMatrixNode(floorMatrix)}
        {getMainAreaMatrixNode(mainAreaMatrix)}
        {getKitchenAreaMatrixNode(kitchenAreaMatrix)}
        {getBalconyMatrixNode(balconyMatrix)}
        {getMetroDistanseMatrixNode(metroDistanseMatrix)}
        {getConditionMatrixNode(conditionMatrix)}
        <div className={classes.btn_row}>
          {formState ? (
            <Button
              danger
              onClick={() => {
                setFormState(false);
              }}
            >
              Отменить
            </Button>
          ) : (
            <Button
              onClick={() => {
                setFormState(true);
              }}
            >
              Изменить
            </Button>
          )}
          {formState ? <Button htmlType="submit">Отправить</Button> : null}
        </div>
      </form>
    </div>
  );
};
