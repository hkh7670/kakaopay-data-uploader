# Data Uploader

### 개발환경
1. Java 8
2. React
3. Gradle
4. H2 (MySQL Mode)

### 구현방법
대량 Insert 시 성능이슈를 극복하기 위해 BatchInsert를 이용하여 구현하였습니다.

### 실행방법
1. Gradle Build를 합니다. (이때 yarn build도 같이 진행됨)
2. 빌드 후 DemoApplication.java를 실행합니다.
3. localhost:8080 으로 접속합니다.
4. h2 console은 다음 주소로 접속 가능합니다.

    (접속주소 : localhost:8080/h2-console 
   
    JDBC URL: jdbc:h2:mem:testdb;MODE=mysql
   
    User Name: root
   
    Password: 없음)

잘 부탁드립니다!