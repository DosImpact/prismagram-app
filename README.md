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
  (카카오톡을 오프라인에서 볼수있다는점. | 인스타그램은 기존의 데이터를 먼저 보여주고 밑에서는 데이터를 가져와 대기중) -[https://github.com/apollographql/apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist)

```js
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
```

# 10.3 Recap (4:37)

- 애러 핸들링 | 공식문서 상에는 다음처럼 바뀌어서 수정함.! | AVD 상에서는 localhost 접근방법이 좀 다름

apollo-link-http

```js
import { HttpLink } from "apollo-link-http";

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

```
import React, { useState } from "react";
import {
 Platform,
 StatusBar,
 StyleSheet,
 View,
 AsyncStorage
} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import { Asset } from "expo-asset";

import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClientOptions from "./apollo";

const Stack = createStackNavigator();

export default function App(props) {
 const [isLoadingComplete, setLoadingComplete] = React.useState(false);
 const [initialNavigationState, setInitialNavigationState] = React.useState();
 const containerRef = React.useRef();
 const { getInitialState } = useLinking(containerRef);
 const [client, setClient] = useState(null);
 // Load any resources or data that we need prior to rendering the app
 React.useEffect(() => {
   async function loadResourcesAndDataAsync() {
     try {
       SplashScreen.preventAutoHide();

       setInitialNavigationState(await getInitialState());
       await Asset.loadAsync([require("./assets/images/logo.png")]);
       await Font.loadAsync({
         ...Ionicons.font,
         "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
       });
       const cache = new InMemoryCache();
       await persistCache({
         cache,
         storage: AsyncStorage
       });
       const client = new ApolloClient({
         cache,
         ...apolloClientOptions
       });
       setClient(client);
     } catch (e) {
       console.warn(e);
     } finally {
       setLoadingComplete(true);
       SplashScreen.hide();
     }
   }
   console.log("App load init setting...");
   loadResourcesAndDataAsync();
 }, []);

 if (!isLoadingComplete && !props.skipLoadingScreen) {
   return null;
 } else {
   return client ? (
     <ApolloProvider client={client}>
       <View style={styles.container}>
         {Platform.OS === "ios" && <StatusBar barStyle="default" />}
         <NavigationContainer
           ref={containerRef}
           initialState={initialNavigationState}
         >
           <Stack.Navigator>
             <Stack.Screen name="Root" component={BottomTabNavigator} />
           </Stack.Navigator>
         </NavigationContainer>
       </View>
     </ApolloProvider>
   ) : <SplashScreen />;
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff"
 }
});


```

```
import { HttpLink } from "apollo-link-http"

const link = new HttpLink({
  uri: "http://10.0.2.2:4000"
});

const options = {
  link,
};

export default options;

```

# 10.4 isLoggedIn part One (10:22)

- theme 제공

# 10.5 isLoggedIn part Two (7:36)

# 10.6 AuthContext part One (10:56)

- Context : 함수들을 다른곳에서 사용한다라?!
- Context 사용법 OneNote정리하고감.

```js
 사용목적 : 언제 어디서든 특정 객체를 사용하고 싶을때 ,
만약에 너가만든 todoElement 를 CRUD 하는 객체를 만들었는데, 이 하나의 인스턴스를 이곳 저곳에서 사용하고 싶다면 힘들겠지.
부모 -> 자식 컴포넌트로 변수가흐르니까

context 를 사용하면 Provider와 함께 , 언제 어디서든 호출 가능!!


#1.context 정의   로그인 하는 기능을 어디서든 사용하고 싶다면!
- export const AuthContext = createContext(); -> useContext 로 사용 이곳저곳에서 사용
- AuthProvider -> 프로바이더 제공 1번만

---
import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(null);
   const logUserIn = async () => {
       try {
           await AsyncStorage.setItem("isLoggedIn", "true");
           setIsLoggedIn(true);
       } catch (e) {
           console.log(e);
       }
   };
   const logUserOut = async () => {
       try {
           await AsyncStorage.setItem("isLoggedIn", "false");
           setIsLoggedIn(false);
       } catch (e) {
           console.log(e);
       }
   };
   return (
       <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
           {children}
       </AuthContext.Provider>
   );
};
export const useIsLoggedIn = () => {
   const { isLoggedIn } = useContext(AuthContext);
   return isLoggedIn;
};
export const useLogIn = () => {
   const { logUserIn } = useContext(AuthContext);
   return logUserIn;
};
export const useLogOut = () => {
   const { logUserOut } = useContext(AuthContext);
   return logUserOut;
};

#2. Provider 제공

import { AuthProvider } from "./AuthContext";


         <AuthProvider>
           <View style={styles.container}>
             {Platform.OS === "ios" && <StatusBar barStyle="default" />}
             <NavigationContainer
               ref={containerRef}
               initialState={initialNavigationState}
             >
               <Stack.Navigator initialRouteName="Auth">
                 <Stack.Screen name="Root" component={BottomTabNavigator} />
                 <Stack.Screen name="Auth" component={Login} />
               </Stack.Navigator>
             </NavigationContainer>
           </View>
         </AuthProvider>


#3 사용하기 (사실 위에서 이미 사용함 )
---

import { useIsLoggedIn } from "../AuthContext";
`;
export default function HomeScreen() {

 const isLoggedIn = useIsLoggedIn();
 console.log(isLoggedIn);
}



```

# 10.7 AuthContext part Two (8:00)

- 로그인 로직
- 1.  앱로딩 (그동안 스플레쉬를 보여준다.) 2. 로그인 여부 살피기 ( 그동안 빈화면? ) 3. 로그인 결과

# 11.0 Introduction To Navigation (10:51)

- 3가지 네비게이션이 있다. draw, Tab(bottom,side...), stack
- stack 네비게이션은 대기하고 있다가 언제든 호출 가능

```
stack
 - bottomTab
    -
```

# 11.1 AuthNavigation (13:06)

pass

# 11.2 Tabs Navigation (9:17)

- context 에서 login 되었다면 바텀탭 네비게이션으로 | 아니라면 로그인 Auth Nav로

- fake Nav

```js
<BottomTab.Screen
  name="Add"
  component={View}
  options={{
    title: "Add",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name="md-code-working" />
    )
  }}
/>
```

# 11.3 Photo Navigation (12:31)

- yarn add @react-navigation/material-top-tabs react-native-tab-view
- yarn add react-native-reanimated

# 11.4 Messages Navigation part One (10:18)

# 11.5 Message Navigation part Two (6:16)

# 11.6 Navigation Conclusions (2:23)

- 바로 전의 navigation만 참조가 가능하다.!

```
export default ({ navigation, route }) => {
```
