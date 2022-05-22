https://docs.nestjs.kr/microservices/basics

## express
 - 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결핟고 유연한 node웹 애플리케이션 프레임워크
 - 노드의 표준 웹 서버 프레임워크로 불려질 만큼 많은 곳에서 사용하고 있음
 - node.js 는 chrome의 v8엔진을 이용하여 js로 브라우저가 아니라 서버를 구축하고, 서버에서 js가 작동되도록 해주는 런타임환경(플랫폼)
 - 가장 많이 보편적으로 사용되기 때문에 구글링을 통해 래퍼런스 검색할 수 있다.
 - typescript를 express에서 사용할 수 있지만, tsconfig.json, lint.json 등등의 json파일을 만들고 세팅하는 과정이 복잡합니다.
 - 웹서버를 빠르게 구현하기 위해 개발시에 구조에 대한 자유도가 높습니다.

## nest.js
 - Nest (NestJS)는 효율적이고 확장 가능한 Node.js서버측 애플리케이션을 구축하기 위한 프레임워크
 - 프로그레시브 자바스크립트를 사용하고 TypeScript로 빌드되고 완벽하게 지원(하지만 여전히 개발자가 순수 자바스크립트로 코딩할 수 있음)
 - OOP (객체 지향 프로그래밍 Object Oriented Programming), FP (함수형 프로그래밍 Functional Programming) 및 FRP (함수형 반응형 프로그래밍 Functional Reactive Programming) 요소를 결합
 - express를 기본으로 채택하고 그 위에 여러 기능을 미리 구현해놓은 것이 nestjs입니다.

### 특징
 - NestJS를 이용하면 확장 가능하며 유지 관리가 쉬운 서버 애플리케이션을 쉽게 개발할 수 있습니다.
 - TypeScript 및 OOP (객체 지향 프로그래밍), FP (기능 프로그래밍), FRP (기능 반응성 프로그래밍) 요소를 결합합니다. (효율성 증가)
 - Nestjs는 typescript를 적극적으로 도입함으로서 서버 어플리케이션 개발 시 발생할 수 있는 오류들을 사전에 방지할 수 있도록 했습니다. 
 - 또한 모듈로 감싸는 형태로 개발하기 때문에 모듈 별로 테스트 코드를 쉽게 작성할 수 있도록 구현되어 있습니다. (안정적)
 - Nestjs는 module을 통해 확장이 용이하도록 설계되어 있습니다. 실제로 사용해보면 module을 통해 코드적으로, 논리적으로 구분한다는 장점을 크게 느끼실 수 있습니다. 
 - 또한 nestjs는 기본적으로 마이크로서비스 아키텍처 개발 스타일을 제공합니다.  (참고//https://docs.nestjs.kr/microservices/basics
 - Nest는 typescript를 사용하여 DI(Dependency Injection), IoC(Inversion of Control), 모듈을 통한 구조화 등의 기술을 통해 생산성이 높습니다.
 - spring과 사용 경험이 유사하고 spring보다 간단합니다.
 - 간편하게 Validation로직을 작성할 수 있습니다. (파이프 pip 사용)

## 차이점 
 - 다른사람이 작성한 아키텍쳐를 한번에 이해하기가 쉽지않다
 - Express는 라우팅 할 때 app.use처럼 등록해서 사용. 하지만 Nest는 모듈별로 나누어서 라우팅
 - 컨트롤러의 차이

-https://choseongho93.tistory.com/318
