from flask import Flask, render_template, request, json,jsonify
import csv
import pandas as pd
import numpy as np

import math
import sys
import os

from sklearn.compose import ColumnTransformer
# Split data into train and test
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

from sklearn.cluster import KMeans
from scipy.spatial import ConvexHull, convex_hull_plot_2d
from shapely import geometry

from sklearn.metrics import accuracy_score
from sklearn.decomposition import PCA
#import Dice
import dice_ml
from dice_ml.utils import helpers # this is the helper function
import joblib
from sklearn.manifold import TSNE


PATH = "D:/UCSP/readme/testData/"

app = Flask(__name__,static_url_path='/static')


class students():
	df_students = None
	df_dropouts = None
	df_contrafactuales = None
dataStudents = students()

class Contrafactuales():
  d = None
  model = None
  m = None
  exp = None
MyContrafactual = Contrafactuales()

class columnsNames():
  df_columns_Names = None
  df_columns_Numericos = None
  df_columns_Categoricos = None
  df_columns_Ordinales = None
  df_Target = None
  df_Index = None
MycolunsNames = columnsNames()

class Model():
	M_name = None
	M_model = None
MyModel = Model()

class Probabilidades():
  ProbabilidadesMain = ()
  ProbabilidadesContrafactuales = ()
MyProbabilities = Probabilidades()

@app.route("/",methods=["GET","POST"])
def index():
    print(os.path.dirname(app.instance_path))
    return render_template('index.html')

@app.route("/Iniciar",methods=["GET","POST"])
def Iniciar():
	#cargar los datos
    datasetName = "New_CleanData_Student.csv"
    ModelName = str(request.form['model'])
    NumberOfCounterfactuals = int(request.form['numberc'])
    print("_____________________________________________________")

    contrafactualName = 'New_contrafactuales.csv'
    f=open(PATH+'columnsType.json',)
    temporal = json.load(f)

    dtypes = pd.read_csv(PATH+'DataTypes.csv',dtype={'name':str,'type':str}) # Para cargar los datos teniendo en cuenta los tipos de datos
    dtypes = dtypes.set_index('name')
    
    MycolunsNames.df_columns_Numericos = temporal['Numericos']
    MycolunsNames.df_columns_Categoricos = temporal['Categoricos']
    MycolunsNames.df_Index = temporal['Index']
    MycolunsNames.df_Target = temporal['Target']
    
    #loading dataset
    dataStudents.df_students = pd.read_csv(PATH+datasetName,dtype=dtypes.to_dict()['type'])#(open(path+'ListofNodes_filtered_large.csv', newline=''), delimiter=',', quotechar='|')
	#cargar el modelo
    Students_id = dataStudents.df_students.columns.values.tolist().index(MycolunsNames.df_Index)
    dataStudents.df_students.set_index(MycolunsNames.df_Index,inplace=True)
    df_Students_columns = dataStudents.df_students.drop(temporal['Target'],axis=1).columns.values
    MycolunsNames.df_columns_Names = df_Students_columns
    
    dataStudents.df_contrafactuales = pd.read_csv(PATH+contrafactualName, dtype=dtypes.to_dict()['type'])
    dataStudents.df_contrafactuales.set_index(MycolunsNames.df_Index,inplace=True)

    dataStudents.df_dropouts = dataStudents.df_students[dataStudents.df_students[MycolunsNames.df_Target]==0]
    
    MyModel.M_model = joblib.load(PATH+"New_finalized_model.sav")
    
    return json.dumps({'Columns': ",".join( MycolunsNames.df_columns_Names),'Numericos': ",".join(MycolunsNames.df_columns_Numericos),'Categoricos':",".join(MycolunsNames.df_columns_Categoricos),'students':dataStudents.df_dropouts.to_json(orient='records')})

def Profection_df(x_train, Categoricos):
  df = x_train#dataStudents.df_dropouts
  df_Categoricos = df[Categoricos]
  df.drop(columns=Categoricos,inplace=True)

  #Projection
  enc = OneHotEncoder(handle_unknown='ignore')
  A = enc.fit(df_Categoricos).transform(df_Categoricos).toarray()
  A = pd.DataFrame(A)
  A[MycolunsNames.df_Index] =  df.index
  A.set_index(MycolunsNames.df_Index,inplace=True)
  df = pd.concat([df, A], axis=1)

  pca = TSNE(n_components=2)
  projection = pca.fit_transform(df)
  return projection

@app.route("/EjecutarCambios",methods=["GET","POST"])
def EjecutarCambios():
  cambios = request.form['cambios']
  cambios = json.loads(cambios)
  
  f = open(PATH+'responseContrafactuales.json', "r")
  temporal = json.loads(f.read())
  MyProbabilities.ProbabilidadesMain =  pd.DataFrame(temporal['ProbabilidadesMain']) #pd.read_csv(PATH+"1_New_ProbabilitiesMain.csv",dtype={'COD_PERSONA':str, 'prob_0':float,'prob_1':float,'x':float,'y':float,'class':int})#)DataFrame()
  

  MyProbabilities.ProbabilidadesContrafactuales = pd.DataFrame(temporal['ProbabilidadesContrafactuales'])#pd.DataFrame(json.loads(f.read())['ProbabilidadesContrafactuales'])
  

  dfStudent = pd.DataFrame(temporal['DropoutStudents'])#dataStudents.df_students.reset_index()
  dfContrafactuales = pd.DataFrame(temporal['Contrafactuales'])#dataStudents.df_contrafactuales.reset_index()
  '''return json.dumps({'DropoutStudents': json.loads(dfStudent[dfStudent['Dropout']==1].to_json(orient='records',index=True)),
                    'ProbabilidadesMain':json.loads(MyProbabilities.ProbabilidadesMain[MyProbabilities.ProbabilidadesMain['class']==1].to_json(orient='records')),
                    'Contrafactuales': json.loads(dfContrafactuales.to_json(orient='records')),
                    'ProbabilidadesContrafactuales':json.loads(MyProbabilities.ProbabilidadesContrafactuales.to_json(orient='records',index=True)) })'''
  return json.dumps({'DropoutStudents': json.loads(dfStudent.to_json(orient='records',index=True)),
                    'ProbabilidadesMain':json.loads(MyProbabilities.ProbabilidadesMain.to_json(orient='records')),
                    'Contrafactuales': json.loads(dfContrafactuales.to_json(orient='records')),
                    'ProbabilidadesContrafactuales':json.loads(MyProbabilities.ProbabilidadesContrafactuales.to_json(orient='records',index=True)) })


@app.route("/SelectByQuery",methods=["GET","POST"])
def SelectByQuery():
  TEXTO = request.form['query']
  try:
    codigos = dataStudents.df_dropouts.query(TEXTO).index.values
    
    codigos = [str(code) for code in codigos]
    return json.dumps({'Row_Selected': ",".join(codigos)})
  except:
    return json.dumps({'Row_Selected':""})


@app.route("/voting",methods=["GET","POST"])
def voting():
  contrafactuales = request.form['contrafactuales']
  contrafactuales = json.loads(contrafactuales)
  Resultado = {}
  for diccionario in contrafactuales:
    for key in diccionario:
      if key in Resultado:
        Resultado[key]= Resultado[key] if Resultado[key] > diccionario[key] else diccionario[key]
      else:
        Resultado[key]= diccionario[key]

  return json.dumps({'newCounterfactuals':Resultado})

def cambioImpact(cambios,ids):
  consulta = dataStudents.df_dropouts.loc[ids].copy()
  for key,value in cambios.items():
    consulta[key]=value
  
  consulta['Gender'] = consulta['Gender'].apply(lambda x: 1 if x=='M' else 0)
  consulta['Marital_E'] = consulta['Marital_E'].apply(lambda x: 1 if x=='S' else 0)
  consulta['School_Type'] = consulta['School_Type'].apply(lambda x: 1 if x=='Private' else 0)
  consulta['Scholarship'] = consulta['Scholarship'].apply(lambda x: 1 if x=='Y' else 0)

  
  #Fin solo temporalmente-----------
  result = MyModel.M_model.predict(consulta.drop(MycolunsNames.df_Target, axis=1))
  print("Len ids:",len(ids))
  print("resultado:",list(result).count(1))
  return list(result).count(1)

@app.route("/MeasureImpact",methods=["GET","POST"])
def MeasureImpact():
  cambios = request.form['cambios']
  cambios = json.loads(cambios)
  dict_ids = request.form['ids']
  dict_ids = json.loads(dict_ids)
  print('===================',cambios,dict_ids)
  result={}
  for key,ids in dict_ids.items():
    ids = [int(i) for i in ids]
    number= cambioImpact(cambios,ids)
    result[key]=number
  
  return json.dumps({'resultado':result})

if __name__=="__main__":
    app.run(debug=True)