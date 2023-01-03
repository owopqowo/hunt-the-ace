# 학습 내용 정리
## CSS backface-visibility
3D 요소와 연관되어 있으며, 입체적인 모습의 뒷면의 가시성을 결정하는 속성
### 문법
visible : 요소의 뒷면을 노출 (기본값)  
hidden : 요소의 뒷면을 비노출
## CSS perspective
3D 요소와 관찰자와의 거리, 즉 원근감을 적용하는 속성  
값이 작을수록 가깝게 보이고 값이 많을수록 멀게 보인다  
0 또는 음수값은 원근 반환 적용 ❌
### perspective와 transform: perspective()의 차이
https://codepen.io/jaehee/pen/JKqqea
#### perspective
- 적용 대상 : 관찰대상의 부모요소 (원근감이 요소간에 영향을 미치면서 반영)
- 기준점 설정 : perspective-origin
#### perspective()
- 적용 대상 : 관찰 대상 자체
- 기준점 설정 : transform-origin
## CSS perspective-origin
관찰자가 요소를 보는 위치를 적용하는 속성
### 문법
50% 50% : (기본값)  
x축 : 단일값  
x축 y축 : 이중값  
y축 x축 : x 위치와 y 위치가 모두 키워드인 경우

x축 : left, right, center의 키워드 및 %, 단위 사용 가능  
y축 : top, bottom, center의 키워드 및 %, 단위 사용 가능
## CSS transform-style
중첩된 요소가 3D 공간에서 렌더링되는 방식을 지정하는 속성
### 문법
flat : 자식 요소를 2D의 2차원에서 부모 요소와 동일한 평면에 배치  
preserve-3d : 자식 요소를 3D 공간에 배치
## JS DOM 탐색
DOM에 수행하는 모든 연산은 document 객체에서 시작  
DOM에서 null 값은 '존재하지 않음’이나 '해당하는 노드가 없음’을 의미
![dom-links](https://user-images.githubusercontent.com/54467533/210304102-e125cb7c-21a4-4d05-b8bb-caf16d16e3d2.svg)
### 트리 상단
- <html> = document.documentElement
- <body> = document.body
- <head> = document.head
### 자식 노드
- childNodes : 텍스트 노드를 포함한 모든 자식 노드
- firstChild : 첫 번째 자식 노드
- lastChild : 마지막 자식 노드
※ 자식 노드의 존재 여부를 검사할 땐 함수 elem.hasChildNodes()를 사용
### 형제 노드
- previousSibling : 이전 형제 노드
- nextSibling : 다음 형제 노드
### 부모 노드
- parentNode : 부모 노드
### 요소 간 이동
![dom-links-elements](https://user-images.githubusercontent.com/54467533/210304129-923a6a57-73ff-42ab-8d84-691a4c7c31c7.svg)
- children : 자식 노드 중 요소 노드
- firstElementChild : 첫 번째 자식 요소 노드
- lastElementChild : 마지막 자식 요소 노드
- previousElementSibling : 이전 형제 요소 노드
- nextElementSibling : 다음 형제 요소 노드
- parentElement : 부모 요소 노드