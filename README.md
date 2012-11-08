trac.js
=======

与えられたキーワードからTracのしかるべきページにアクセスするVimperatorプラグインです。


使い方
------
### 指定したチケットのページにアクセスする

    :trac #1234

### 指定したリビジョンのページにアクセスする

    :trac r5678

### 指定したキーワードでTrac内のページを検索する

    :trac foobar


.vimperatorrcの設定
-------------------

### g:trac_base_url

使用しているTracのURLを設定してください。

    let g:trac_base_url = 'http://example.com/trac/'


### g:trac_force_type

\#やrを伴なわない数字だけがキーワードに与えられた場合、強制的にチケット番号またはチェンジセット番号として扱います。

    let g:trac_force_type = '#' or 'r'
