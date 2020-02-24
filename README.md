# env setting

```
npm install styled-components --save
npm install @apollo/react-hooks apollo-client graphql apollo-boost apollo-cache-inmemory --save
yarn add apollo-cache-persist
```

# Prismagram iOS & Android App

Screens:

- [ ] Home
- [ ] Search
- [ ] Upload
- [ ] Notifications (Challenge)
- [ ] Profile
- [ ] Edit Profile (Challenge)
- [ ] Photo Detail
- [ ] Photo Comments (Challenge)
- [ ] Photo Likes (Challenge)


 # 10.0 Creating the Project (8:03)
 
 # 10.1 Preloading Assets (10:30)

 ### App.js
- 폰트 프리로드
- 이미지 프리로드
```js
        await Asset.loadAsync([require("./assets/images/logo.png")]);
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
```
 
 # 10.2 Preloading Cache (9:23)

### 데이터 캐쉬 관리
 - 모바일폰에서는 인터넷 연결이 안되있으면 최신 상태의 정보들을 보여준다. 그리고 연결이 되는순간이에 비로소 하나씩 업데이트가 되지.
 (카카오톡을 오프라인에서 볼수있다는점. | 인스타그램은 기존의 데이터를 먼저 보여주고 밑에서는 데이터를 가져와 대기중)
 -[https://github.com/apollographql/apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist)
```js
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";


```

 # 10.3 Recap (4:37)
 
 - 애러 핸들링 | 공식문서 상에는 다음처럼 바뀌어서 수정함.! | AVD 상에서는 localhost 접근방법이 좀 다름 

 apollo-link-http

 ```js
    import { HttpLink } from "apollo-link-http"

    const link = new HttpLink({
    uri: "https://0fh7c.sse.codesandbox.io/"
    });

    const options = {
    link
    };

    export default options;

 ```
 ```
 보통 PC에서 웹서버를 동작하게 하면, 웹 브라우져에서 "http://localhost:8080"로 접속 한다.

하지만 안드로이드 에뮬레이터에서는 "http://10.0.2.2:4000"로

접속을 해야 localhost에 접속이 가능하다.
 ```

 # 10.4 isLoggedIn part One (10:22)

 - theme 제공
 
 # 10.5 isLoggedIn part Two (7:36)
 
 # 10.6 AuthContext part One (10:56)
 
 # 10.7 AuthContext part Two (8:00)