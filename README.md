# Data Uploader

### 개발환경
1. Java 8
2. React
3. Gradle
4. H2 (MySQL Mode)

### 구현방법 및 결과
1. 대량 Insert 시 성능이슈를 극복하기 위해 jdbcTemplate을 이용하여 BatchInsert를 구현하였습니다.
2. batchSize를 50000 으로 설정하였습니다.
3. JPA의 saveAll을 이용하는 방법에 비해 눈에띄는 성능향상이 있었습니다. (10초 이상 -> 2~3초)

### 실행방법
1. frontend/my-app 경로에서 yarn 명령을 실행하여 package.json의 의존성 모듈을 설치해줍니다.
2. Gradle Build를 합니다. (이때 yarn build도 같이 진행됨)
3. 빌드 후 DemoApplication.java를 실행합니다.
4. localhost:8080 으로 접속합니다.
5. h2 console은 다음 주소로 접속 가능합니다.

    (접속주소 : localhost:8080/h2-console 
   
    JDBC URL: jdbc:h2:mem:testdb;MODE=mysql
   
    User Name: root
   
    Password: 없음)

잘 부탁드립니다!
