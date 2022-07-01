SDA-Vis: A Visualization System for Student Dropout Analysis Based on Counterfactual Exploration
======================================================================
*Sistema de visualización para el análisis de abandono de estudios basado en contrafactuales*

[Garcia-Zanabria, G.](https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=34979/),
[Gutierrez-Pachas, D. A.](https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=16332/),
[Camara-Chavez, G.](https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=16064/),
[Poco, J.](https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=17033/),
[Gomez-Nieto, E.](https://ctivitae.concytec.gob.pe/appDirectorioCTI/VerDatosInvestigador.do?id_investigador=17384/)  


[Paper ](https://www.mdpi.com/2076-3417/12/12/5785>) | [Documentación](https://github.com/germaingarcia/SDA-VIS>)|


![](https://github.com/germaingarcia/SDA-VIS/blob/22581be5b16a6005125fcf1f4265b19cdfbfe95f/figs/counterfactual.gif)


SDA-Vis es un plataforma  basado en contrafactuales para ayudar a los usuarios a analizar la deserción de los estudiantes en función a sus caracteristicas. Este sistema permite a los usuarios identificar las causas de la deserción y generar opciones sintéticas de no deserción que podrían ayudar a mitigar cualquier factor que pueda crear un riesgo de deserción en un estudiante.  

## SDA-Vis: diseño visual y descripción general
A continuación se muestra el sistema SDA-Vis y sus componentes. Los principales recursos son:
* [A] histogramas para representar la distribución de las características de los estudiantes, 
* [B] una proyección para representar las probabilidades de los estudiantes según el umbral del modelo, 
* [C] una proyección para representar los contrafactuales y sus probabilidades, 
* [D] exploración contrafactual para representar los valores sintéticos, 
* [E] una tabla que muestra todos los valores reales de los estudiantes que desertaron, y 
* [F] una visualización del impacto de algunos contrafactuales en un determinado grupo de estudiantes.

![](https://github.com/germaingarcia/SDA-VIS/blob/6f51f4582b2eefd742f7c722aecfba4e237fe9b4/figs/main.png)

Sistema SDA-Vis: un conjunto de recursos visuales vinculados que permiten la exploración de la información de los estudiantes que abandonan la universidad y sus explicaciones contrafácticas. Los nombres de los recursos visuales son: **A** Feature Distribution Bars view, **B** Student Projection view, **C** Counterfactual Projection view, **D** Counterfactual Exploration view, **E** Table view, and **F** Impact view.


Alistando Ambiente 
-----------------
La implementación del sistema SDA-Vis se basó en [Flask](https://flask.palletsprojects.com/en/2.1.x/), con el back-end ejecutándose en Python y el front-end en JavaScript. Los datos fueron preprocesados debido al costo computacional del cálculo contrafáctico. Para calcular los contrafactuales, usamos la técnica [DiCE](github.com/microsoft/DiCE). Para calcular la probabilidad de clasificación, utilizamos diferentes modelos de aprendizaje automático (bosque aleatorio, regresión logística y árbol de decisiones) de la biblioteca de Python scikit-learn. La limpieza y el filtrado de datos se realizaron utilizando las bibliotecas pandas y NumPy Python. Finalmente, todos los recursos de visualización se desarrollaron en base a la biblioteca de JavaScript [D3.js](d3js.org).

Para instalar las dependencias manualmente:
```bash
    pip install -r requerimientos.txt
```

SDA-vis requiere algunos paquetes:
* flask
* numpy
* pandas
* scikit-learn
* dice_ml
* joblib

Empenzando con SDA-Vis
-------------------------
Con SDA-Vis, el análisis puede ser separado en tres pasos: Carga del conjunto de datos, Análisis basado en contrafactuales y Medir impacto de contrafactuales.

El primer paso es levantar el servidor flask
```bash
    python main.py
```
en el archivo *main.py* se tiene que estar seguro de la ruta de los conjuntos de datos:
```bash
PATH = "DataPAth/"
app = Flask(__name__,static_url_path='/static')
```

Un ejemplo del proceso de se puede encontrar en el [documento del link](https://github.com/germaingarcia/SDA-VIS/blob/b1d85f91db1849f738e645c7810a100dd4a581a7/Manual_SDA-Vis.docx.pdf)


Flujo de trabajo de exploración visual
-----------------
El usuario primero carga el conjunto de datos, luego las características y distribuciones de los estudiantes se calculan y utilizan para guiar el análisis. Para este propósito, los usuarios emplean Feature Distribution Bars View **(A)**. Una vez que el usuario está familiarizado con los atributos, es necesario que el análisis de los potenciales desertores sea mapeado en la vista **SP B** . El usuario puede seleccionar un conjunto diferente de estudiantes en función a los indicadores (por ejemplo, probabilidad, viabilidad y factibilidad). Una vez identificado un grupo de interés en la vista **SP**, nuestra vista **CP (C)** muestra todos los contrafactuales asociados con la anterior selección. El usuario puede elegir libremente un conjunto de contrafactuales para inspeccionar. Para dicha inspección, el siguiente paso es utilizar Counterfactual Exploration view **(D)**, que muestra los valores originales para cada atributo. Al mismo tiempo, los contrafactuales calculados muestran sólo los valores que necesitan ser modificados. Los estudiantes y sus contrafactuales podrían ser
reordenados en función de la viabilidad y factibilidad, para ayudar a los usuarios a seleccionar contrafactuales específicos para un mayor análisis e investigación. Finalmente, el usuario podría medir cómo los cambios sugeridos por un contrafactual seleccionado puede influir en algunos estudiantes que usan el Impacto (Impact view **(F)**). Esta visualización muestra hasta qué punto sería posible reducir el número de abandonos. Para ello, es necesario seleccionar subconjuntos de alumnos para los que el usuario quiera medir el impacto. Para elegir los subconjuntos, el usuario  puede utilizar el Table View **E**, aplicando
algunos filtros.

Si el análisis resultante no satisface las necesidades de los usuarios, los usuarios pueden seleccionar otros
contrafactuales desde Counterfactual Exploration view o comenzar de nuevo desde Dropout Analysis dual view **(B y C)** para considerar un nuevo grupo de estudiantes/contrafactuales y obtener un análisis más detallado


Citación
-------
Si encontraste SDA-Vis una herramienta interesante para tu trabajo, por favor cita de la siguiente manera:

Garcia-Zanabria, G., Gutierrez-Pachas, D. A., Camara-Chavez, G., Poco, J., & Gomez-Nieto, E. (2022). **SDA-Vis: A Visualization System for Student Dropout Analysis Based on Counterfactual Exploration**. *Applied Sciences*, 12(12), 5785.


Bibtex::

	@article{garcia2022sda,
		  title={SDA-Vis: A Visualization System for Student Dropout Analysis Based on Counterfactual Exploration},
		  author={Garcia-Zanabria, Germain and Gutierrez-Pachas, Daniel A and Camara-Chavez, Guillermo and Poco, Jorge and Gomez-Nieto, Erick},
		  journal={Applied Sciences},
		  volume={12},
		  number={12},
		  pages={5785},
		  year={2022},
		  publisher={MDPI}
	}
	

## Agradecimientos
Agradecemos por el soporte financiero al proyecto World Bank Concytec: ``Mejoramiento y Ampliación de Servicios del Sistema Nacional de Ciencia, Tecnología e Innovación Tecnológica'' (ProCiencia) por el proyecto 
``Ciencia de datos en educación: análisis de datos a gran escala utilizando métodos computacionales para detectar y prevenir problemas de violencia y deserción en entornos educativos'' (Grant 028-2019-FONDECYT-BM-INC.INV).


