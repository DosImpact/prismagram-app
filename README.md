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

### 네비게이션 파트 종료

# 12 App: Auth

# 12.0 AuthHome (12:18)

# 12.1 Auth Components part One (12:20)

# 12.2 Auth Components part Two (8:11)

- input에 대한 올바른 입력검사는 정규식을 이용한다.

```js
const handleLogin = () => {
  const { value } = emailInput;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (value === "") {
    Alert.alert("Email can't be empty");
  } else if (!emailRegex.test(value)) {
    return Alert.alert("invalid Email");
  } else {
  }
};
```

- 바깥화면을 누르면 키보드 없애기

```js
import { TouchableWithoutFeedback, Keyboard } from "react-native";

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <AuthInput
      {...emailInput}
      placeholder="Email"
      keyboardType="email-address"
    />
    <AuthButton onPress={handleLogin} text="Log In" />
  </View>
</TouchableWithoutFeedback>;
```

# 12.3 Login part One (10:46)

# 12.4 Login part Two (10:20)

# 12.5 Login part Three (4:00)

# 12.6 Confirm (12:42)

# 12.7 Singup (14:26)

# 12.8 Facebook Login part One (11:33)

- 페이스북 로그인은 expo 덕분에 매우매우 쉽다.
- 실제 어플리케이션에 적용하려면 iOS,Android 는 추가적인 작업 필요

### 페이스북 connect

- 페이스북 로그인 API를 가져와서, user의 엑세스토큰을 발급
- 엑세스 토큰을 이용해서 사용자의 프로필 정보(name,fistname,lastname,email 등의 정보를 입력받는다. )
- 그리고 기존의 JWT 방식대로 로그인 할거임 form을 자동으로 채워
- 그리고 내 서버로 createAccount 함.

* expo 문서
  [https://docs.expo.io/versions/latest/sdk/facebook/](https://docs.expo.io/versions/latest/sdk/facebook/)

-

```js
//설치 및 입포트
expo install expo-facebook

import * as Facebook from "expo-facebook";
```

```js
const fbLogin = async () => {
  try {
    await Facebook.initializeAsync("230353268007145");
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"]
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
      );
      //Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      const { email, first_name, last_name } = await response.json();
      emailInput.setValue(email);
      firstNameInput.setValue(first_name);
      lastNameInput.setValue(last_name);
      const [name] = email.split("@");
      nameInput.setValue(name);
      setLoading(false);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};
```

# 12.9 Facebook Login part Two (9:28)

# 12.10 Google Login (11:24)

### 1. 설치 및 임포트

- Google 로그인-> expo 앱에서 사용하는 방법이랑 | standalone 사용법이랑 다르다.

```js
expo install expo-google-app-auth
import * as Google from "expo-google-app-auth";
```

### 2. Client ID 얻기

- Google APIs 가서 expo 문서대로 절차를 밟기

- iOS Client ID

```
1048824293201-hkjen58cu3256p8l5fo9l87q6ab5l41m.apps.googleusercontent.com
```

- Android Client ID

```
1048824293201-hto3c3v87unpql4o4c795lfkc0pqkm8n.apps.googleusercontent.com
```

### 3. 사용하기

```js
const googleLogin = async () => {
  const GOOGLE_ID_iosClient =
    "1048824293201-hkjen58cu3256p8l5fo9l87q6ab5l41m.apps.googleusercontent.com";
  const GOOGLE_ID_AndroidClient =
    "1048824293201-hto3c3v87unpql4o4c795lfkc0pqkm8n.apps.googleusercontent.com";
  try {
    setLoading(true);
    const result = await Google.logInAsync({
      androidClientId: GOOGLE_ID_AndroidClient,
      iosClientId: GOOGLE_ID_iosClient,
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        }
      );
      const { email, family_name, given_name } = await userInfoResponse.json();
      updateFromData(email, given_name, family_name);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  } finally {
    setLoading(false);
  }
};
```

- TODO :// react-native-dotenv

# 13.0 TabIcons part One (12:50)

//headercenter 이미지
//header right 아이콘
//바텀탭 아이콘설정

# 13.1 TabIcons part Two (10:04)

- Ionicons 은 iOS 랑 md 랑 두가지를 쓸 수 있다. | 또한 empty와 filled 가 있음
- Material 아이콘도

# 13.2 TabBar, Styles, Loader (7:33)

# 14.0 Apollo Context (7:51)

- jwt 토큰을 header에 입력을 해야함.
- 입력은 쉽다.

```js
const token = "klalalal"; //await AsyncStorage.getItem("jwt");

const link = new HttpLink({
  uri: "http://10.0.2.2:4000",
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

- 그러나 App.js는 한번만 컴포넌트가 로딩되고, token는 업데이터가 안되는 상태.

# 14.1 ScrollView and RefreshControl (6:36)

## 수정 매번 request 마다 header를 변경하고 싶다.

```js
yarn add apollo-link-context
```

- link: authLink.concat(link) 을 이용해서 매번 request마다 link를 업데이트 해줌!

```js
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { AsyncStorage } from "react-native";

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("jwt");
  console.log("--> request update -->", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const link = new HttpLink({
  uri: "http://10.0.2.2:4000"
});

const options = {
  link: authLink.concat(link)
};

export default options;
```

- link: authLink.concat(link) 을 이용해서 매번 request마다 link를 업데이트 해줌!

## ScrollView vs FlatList

- if you wanna high performant inerface for rendering -> FlatList( huge Data in View )
- FlatList can use with key,value

## scrollView pull-to-refreshing

- 1. useQuery 에서 refect 인자 받아오기 | Fn 실행시 데이터 업데이트 함

```js
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const ME = gql`
  {
    me {
      name
      email
      fullName
    }
  }
`;

const { loading: ME_loading, data: ME_data, refetch } = useQuery(ME);
```

- 2. ScrollView 의 RefreshControl 추가하기 | refreshing = Boolean | handleReFetch = callback

```js
import { ScrollView, RefreshControl } from "react-native";

const [refreshing, setRefreshing] = useState(false);
const handleReFetch = async () => {
  try {
    setRefreshing(true);
    await refetch();
    console.log("--> Data Fechting with jwt", ME_loading, ME_data);
  } catch (error) {
    console.error(error);
  } finally {
    setRefreshing(false);
  }
};
<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={handleReFetch} />
  }
></ScrollView>;
```

# 15 App: Post Component

- 요약 : Home화면 만듬 | 쿼리(seeFeed, setLike) | Post컴포넌트 ( 헤더부분, 사진 swiper, 좋아요 백 연결)

# 16 App: Search Screen

- 요약 : Navigation header에 검색창 만듬 | Search Query를 실행

# 16.0 Search as HeaderTitle part One (10:23)

# 16.1 Search as HeaderTitle part Two (8:21)

# 16.2 Search Query (9:50)

- Query 옵션 : 스킵가능! | fetch정책 : 캐쉬먼저(디폴트) | 캐쉬만 | 네트워크만

# 16.3 Search Photo (11:42)

- SquarePhoto : 사진을 예쁘게 사각형으로 보여준다. ( search 결과)
- Detail : 사진을클릭했을때 자세한 정보를 보여주도록 한다. ( searchTab의 stacknavigation에 Detail.js 추가 )

# 16.4 Photo Detail (10:00)

## 공통된 쿼리 부분은 fragment로 나누기.

- seeFeed SeeFullPost 을 보면 [Post],Post를 리턴한다.
- 그럼 사실상 gql코드는 겹치는 부분이 많다.
- gql 문법으로 fragment를 사용하는 방법을 araboja

# 17.0 Profile Screen (11:13)

- profile 스크린을 꾸밀 Profile 컴포넌트 만들꺼임.
- fragment 작성...-> fragment 속에 fragment 만들기

# 17.1 User Detail Screen (5:57)

- UserProfile 하나의 컴포넌트는 Home의 스택에서도 사용하고, profil에서도 사용한다.
- StackFactory 구현 목적 : Home에서 userName 클릭해도 프로파일 | Search에도 사진 -> userName 클릭해도 프로파일 | Profile 텝도 -> 프로파일
- 구현 방법은, 각각의 TabNav에 stack 자식을 공통으로 추가할 인자를 빼는겨 -> createStackFactory라는 이름으로.

# 17.2 UserProfile Component Styles (14:51)

- Profile 컴포넌트에서 -> navigation의 header의 이름 설정해주기
-

# 17.3 UserProfile Photo Rendering (5:31)

- 테스트 해보기 : navigation은 똑똑하기 때문에, 이름만 입력하면, 알아서 뒤로가고, 앞으로 가고 할꺼임.!!

* Home 이름 클릭-> 프로필
* 검색 -> 사진 클릭 -> 포스트 -> 프로필
* 내 프로필

# 18.0 Tab Styles (6:58)

# 18.1 Select Photo part One (10:54)

- 목적 : 사진앨범에서 사진 uri 가져와서 보여주기

### 1. 설치하기

- [https://docs.expo.io/versions/latest/sdk/media-library/#medialibrarygetassetsasyncoptions](https://docs.expo.io/versions/latest/sdk/media-library/#medialibrarygetassetsasyncoptions)

- [https://docs.expo.io/versions/v36.0.0/sdk/permissions/#permissionsaskasynctypes](https://docs.expo.io/versions/v36.0.0/sdk/permissions/#permissionsaskasynctypes)

```
expo install expo-permissions
expo install expo-media-library
```

### 2. 권한 요청

```js
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

const askPermission = async () => {
  try {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (status === "granted") {
      // setHasPermission(true);
      // getPhotos();
    }
  } catch (error) {
    //setHasPermission(false);
    console.error(error);
  }
};

useEffect(() => {
  askPermission();
  return () => {};
}, []);
```

### 3. 앨범에서 데이터 가져오기

- 주의 : 사진이 하나라도 없으면 assets은 빈 배열

```js
const getPhotos = async () => {
  try {
    const { assets } = await MediaLibrary.getAssetsAsync();
    console.log(assets);
    const [firstPhoto] = assets;
    setSelected(firstPhoto);
    setAllPhotos(assets);
  } catch (error) {
  } finally {
    setLoading(false);
  }
};
```

- 앨범의 데이터는 다음과 같다. ( 사진의 정보가 uri 이다. => 왜 Image컴포넌트가 source{{uri}}를 쓰는지 알겠다.)

```js
Array [
  Object {
    "albumId": "540528482",
    "creationTime": 0,
    "duration": 0,
    "filename": "4f8075cdfeb5064e0c50e869549b860d.png",
    "height": 1927,
    "id": "24",
    "mediaType": "photo",
    "modificationTime": 1583293178000,
    "uri": "file:///storage/emulated/0/Download/4f8075cdfeb5064e0c50e869549b860d.png",
    "width": 1117,
  },
]
```

- 사용하기

````js
  <Image
    style={{ width: 100, height: 100 }}
    source={{ uri: selected.uri }}
  ></Image>
```

# 18.2 Select Photo part Two (5:46)

# 18.3 Take Photo part One (10:35)

# 18.4 Take Photo part Two (7:04)

# 18.5 Saving Photo (11:46)

# 18.6 Navigating to Upload Photo (7:22)

# 18.7 Preparing for Upload (10:20)

# 18.8 Uploading to Backend (10:14)

# 18.9 Uploading to S3 (8:09)

# 18.10 Uploading Mutation (12:39)

# 18.11 Showing off! (4:19)

# 18.12 Messages and Notifications (1:42)
````
