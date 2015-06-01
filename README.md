# About AXISJ


액시스제이가 사용방법이 어려워 초심자에게 다가가기 어려우니 본 문서를 제작하여 액시스제이를 처음 접하는 사용자에게 널리 도움이 되게 해봅시다.

아래의 주소로 접속하면남녀노소 가리지 않고 누구나 액시스제이 설명서를 볼 수 있습니다.
#### http://axisj.github.io/axisj-about

## 참여
프로젝트루트에 Gruntfile.js 파일이 있는데. 해당 파일에서
```js
	grunt.registerTask('intro', ['concat:intro','replace:intro','watch:intro']);
	grunt.registerTask('chapter1', ['concat:chapter1','replace:chapter1','watch:chapter1']);
	grunt.registerTask('chapter2', ['concat:chapter2','replace:chapter2','watch:chapter2']);
```
부분의 `intro, chapter1, chapter2` 를 실행시키면
`samples/axisj` 폴더 아래의 html파일들이 index.html, chapter1.html, chapter2.html 파일로 퍼블리시 됩니다.