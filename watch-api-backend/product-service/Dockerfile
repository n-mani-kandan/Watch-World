FROM openjdk:17-jdk-slim as build

COPY target/product-service-0.0.1-SNAPSHOT.jar product-service-0.0.1-SNAPSHOT.jar

ENTRYPOINT [ "java" ,"-jar" , "/product-service-0.0.1-SNAPSHOT.jar" ]