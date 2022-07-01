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

![](https://github.com/germaingarcia/SDA-VIS/blob/22581be5b16a6005125fcf1f4265b19cdfbfe95f/figs/main.PNG)

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


