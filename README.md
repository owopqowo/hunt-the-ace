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
### perspective-origin
관찰자가 요소를 보는 위치를 적용하는 속성
#### 문법
50% 50% : (기본값)  
x축 : 단일값  
x축 y축 : 이중값  
y축 x축 : x 위치와 y 위치가 모두 키워드인 경우

x축 : left, right, center의 키워드 및 %, 단위 사용 가능  
y축 : top, bottom, center의 키워드 및 %, 단위 사용 가능
## CSS transform-style: preserve-3d
중첩된 요소가 3D 공간에서 렌더링되는 방식을 지정하는 속성
### 문법
flat : 자식 요소를 2D의 2차원에서 부모 요소와 동일한 평면에 배치  
preserve-3d : 자식 요소를 3D 공간에 배치