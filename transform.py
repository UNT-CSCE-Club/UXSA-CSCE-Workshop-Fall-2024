from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_date, when, unix_timestamp, lit, datediff, expr, hour, date_format


spark = SparkSession.builder.appName("CrimeDataTransformation").getOrCreate()

def transform_data(input_path, output_path):
 
    df = spark.read.csv(input_path, header=True, inferSchema=True)
  
    columns_to_drop = ['cross_street', 'crime_code_4', 'crime_code_3', 'crime_code_2']
    df = df.drop(*columns_to_drop)

    fill_values = {'modus_operandi': 'Unknown', 'victim_sex': 'Unknown', 
                   'victim_descent': 'Unknown', 'weapon_code': -1, 
                   'weapon_description': 'Unknown'}
    df = df.na.fill(fill_values)

    df = df.withColumn("date_reported", to_date(col("date_reported"), "MM/dd/yyyy hh:mm:ss a"))
    df = df.withColumn("date_occurred", to_date(col("date_occurred"), "MM/dd/yyyy hh:mm:ss a"))
    df = df.withColumn("report_delay", datediff(col("date_reported"), col("date_occurred")))
    df = df.withColumn("report_delay", when(col("report_delay") < 0, 0).otherwise(col("report_delay")))

    df = df.withColumn("hour_occurred", hour(col("date_occurred")))
    df = df.withColumn("day_of_week", date_format(col("date_occurred"), 'EEEE'))

    df = df.withColumn("age_group", 
        when(col("victim_age") <= 12, "Children")
        .when((col("victim_age") > 12) & (col("victim_age") <= 19), "Teenagers")
        .when((col("victim_age") > 19) & (col("victim_age") <= 35), "Young Adults")
        .when((col("victim_age") > 35) & (col("victim_age") <= 60), "Adults")
        .when(col("victim_age") > 60, "Seniors")
        .otherwise("Unknown"))

    df = df.withColumn("latitude", col("latitude").cast("float"))
    df = df.withColumn("longitude", col("longitude").cast("float"))

    df = df.withColumn("id", col("division_number")).drop("division_number")

    df.write.mode('overwrite').parquet(output_path)

if __name__ == "__main__":
    input_path = '/path/to/input/Crime_Data_from_2020_to_Present.csv'
    output_path = '/path/to/output/transformed_crime_data.parquet'
    transform_data(input_path, output_path)
