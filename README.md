# Desafio15-Servidor con balance de carga

## Retomemos nuestro trabajo para poder ejecutar el servidor en modo fork o cluster, ajustando el balance de carga a través de Nginx.

### EJECUTAR SERVIDORES NODE

**Formato:** link a un repositorio en Github con el proyecto cargado. 
**Sugerencia:** no incluir los node_modules

>> Consigna: 
Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
Agregar en la vista info, el número de procesadores presentes en el servidor.
Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

>> Consigna:
Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Verificar que todo funcione correctamente.
Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.
>> Aspectos a incluir en el entregable:
Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.
Ejemplo:
pm2 start ./miservidor.js -- --port=8080 --modo=fork
pm2 start ./miservidor.js -- --port=8081 --modo=cluster
pm2 start ./miservidor.js -- --port=8082 --modo=fork


## RESOLUCIÓN:

>> Decidí usar directamente PM2 ya que podemos decidir si iniciarlo en modo FORK o en modo CLUSTER cuando ponemos a correr el servidor (con "-i max" cluster y sin "-i max" fork)

## IMPORTANTE: PONER LOS COMANDOS EN CMD Y NO EN POWERSHELL, SINO NO FUNCA

// PARA INICIAR SERVIDOR EN MODO FORK:
$ pm2 start server.js --name="ServerFork" --watch -- -- 8081


// INICIAR SERVIDORES MODO CLUSTER
$ pm2 start server.js --name="ServerCluster1" --watch -i max -- -- 8082

$ pm2 start server.js --name="ServerCluster2" --watch -i max -- -- 8083

$ pm2 start server.js --name="ServerCluster3" --watch -i max -- -- 8084

>> Comprobamos la lista
$ pm2 list

>> Debería figurar lo siguiente en consola:

┌─────┬───────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name              │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │     
├─────┼───────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤     
│ 5   │ ServerCluster1    │ default     │ 1.0.0   │ cluster │ 5628     │ 35s    │ 4    │ online    │ 0%       │ 131.2mb  │ inft11   │ enabled  │     
│ 6   │ ServerCluster1    │ default     │ 1.0.0   │ cluster │ 7540     │ 35s    │ 4    │ online    │ 0%       │ 97.7mb   │ inft11   │ enabled  │     
│ 7   │ ServerCluster1    │ default     │ 1.0.0   │ cluster │ 12912    │ 33s    │ 4    │ online    │ 0%       │ 96.8mb   │ inft11   │ enabled  │     
│ 8   │ ServerCluster1    │ default     │ 1.0.0   │ cluster │ 4276     │ 33s    │ 4    │ online    │ 0%       │ 97.3mb   │ inft11   │ enabled  │     
│ 9   │ ServerCluster2    │ default     │ 1.0.0   │ cluster │ 2144     │ 13s    │ 0    │ online    │ 0%       │ 130.9mb  │ inft11   │ enabled  │     
│ 10  │ ServerCluster2    │ default     │ 1.0.0   │ cluster │ 4376     │ 13s    │ 0    │ online    │ 0%       │ 130.7mb  │ inft11   │ enabled  │     
│ 11  │ ServerCluster2    │ default     │ 1.0.0   │ cluster │ 11068    │ 13s    │ 0    │ online    │ 0%       │ 130.5mb  │ inft11   │ enabled  │     
│ 12  │ ServerCluster2    │ default     │ 1.0.0   │ cluster │ 12768    │ 12s    │ 0    │ online    │ 0%       │ 130.4mb  │ inft11   │ enabled  │     
│ 13  │ ServerCluster3    │ default     │ 1.0.0   │ cluster │ 6524     │ 3s     │ 0    │ online    │ 90.6%    │ 103.7mb  │ inft11   │ enabled  │     
│ 14  │ ServerCluster3    │ default     │ 1.0.0   │ cluster │ 10804    │ 3s     │ 0    │ online    │ 107.9%   │ 103.3mb  │ inft11   │ enabled  │     
│ 15  │ ServerCluster3    │ default     │ 1.0.0   │ cluster │ 13032    │ 3s     │ 0    │ online    │ 114.1%   │ 100.3mb  │ inft11   │ enabled  │     
│ 16  │ ServerCluster3    │ default     │ 1.0.0   │ cluster │ 12352    │ 3s     │ 0    │ online    │ 110.9%   │ 94.6mb   │ inft11   │ enabled  │     
│ 0   │ ServerFork1       │ default     │ 1.0.0   │ fork    │ 1952     │ 35s    │ 4    │ online    │ 0%       │ 96.8mb   │ inft11   │ enabled  │     
└─────┴───────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

>> Editamos nuestro archivo de configuración de Nginx para redirigir las consultas a /api/randoms a un cluster de los que creamos anteriormente:

events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
    }

    server {
        listen       8080;
        server_name  nginx_node;

        location /api/randoms {
            proxy_pass http://node_app/api/random;
        }
    }
}

//////////////////

Nos paramos en la carpeta del servidor descargado de Nginx, escribimos CMD

$ start nginx
$ tasklist /fi "imagename eq nginx.exe" --> verificamos que se hayan iniciado los procesos








