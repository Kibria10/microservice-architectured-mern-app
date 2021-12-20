# microservice-architectured-mern-app
To run the project on a kubernetes cluster:
1.Install skaffold 
2.run kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<WHATERVER YOU WISH> 
3.run kubectl create secret generic jwt-secret2 --from-literal=JWT_KEY2=<WHATERVER YOU WISH> 
4.run skaffold dev 
