// INFO
let INFO =
<>
  <plugin name="trac" version="0.1"
          href="https://github.com/tekiomo/vimperator-plugin-trac/"
          summary="[trac.js] 与えられたキーワードからTracのしかるべきページにアクセスするプラグインです。"
          lang="ja"
          xmlns="http://vimperator.org/namespaces/liberator">
    <author email="tekiomo@gmail.com">tekiomo</author>
    <license>MIT License</license>
    <project name="Vimperator" minVersion="3.0"/>
    <p>与えられたキーワードからTracのしかるべきページにアクセスするプラグインです。</p>
    <item>
        <tags><![CDATA[:trac :tr]]></tags>
        <spec>:tr<oa>ac</oa> #チケット番号</spec>
        <description>
            <p>「#」付きでチケット番号を渡すとチケットのページを開きます</p>
        </description>
    </item>
    <item>
        <spec>:tr<oa>ac</oa> rチェンジセット番号</spec>
        <description>
            <p>「r」付きでチェンジセット番号を渡すとチェンジセットのページを開きます</p>
        </description>
    </item>
    <item>
        <spec>:tr<oa>ac</oa> 検索ワード</spec>
        <description>
            <p>文字列や「#」や「r」が伴なわない数字を渡すと検索ワードとして扱い検索結果ページを開きます</p>
        </description>
    </item>
    <item>
        <tags>g:trac_base_url</tags>
        <spec>let g:trac_base_url = <a>'http://example.com/trac/'</a></spec>
        <description>
            <p>TracのURLの指定</p>
        </description>
    </item>
    <item>
        <tags>g:trac_force_type</tags>
        <spec>g:trac_force_type = <a>'#' or 'r'</a></spec>
        <description>
            <p>#やrを伴なわない数字だけがキーワードに与えられた場合、強制的にチケット番号またはチェンジセット番号として扱います。<br />
            未指定の場合は検索ワード扱いになります。</p>
        </description>
    </item>
  </plugin>
</>;
(function() {
    commands.addUserCommand(
        ['trac'],
        'Trac',
        function(args) {
            var arg = args.join('');
            var force_type = liberator.globalVariables.trac_force_type;
            force_type = /^(?:r|#)$/.test(force_type) ? force_type : '';

            if (force_type && !isNaN(arg)) {
                arg = force_type + arg;
            }

            content.document.location.href = liberator.globalVariables.trac_base_url + (function() {
                if (/^(?:r|#)\d+$/.test(arg)) {
                    return arg.replace(/(#|r)(\d+)/, function($0, $1, $2) {
                        return ($1 === 'r' ? 'changeset/' : 'ticket/') + $2;
                    });
                } else {
                    return 'search?q=' + encodeURIComponent(args.join(' '));
                }
            })();
        }
    );
})();
