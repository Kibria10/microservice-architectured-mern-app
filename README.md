# microservice-architectured-mern-app
To run the project on a kubernetes cluster:
>Install skaffold
>run kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<WHATERVER YOU WISH>
>run kubectl create secret generic jwt-secret2 --from-literal=JWT_KEY2=<WHATERVER YOU WISH>
>run skaffold dev
