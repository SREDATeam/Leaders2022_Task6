# Generated by Django 4.1.2 on 2022-10-26 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leaders_index', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='login',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
