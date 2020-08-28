
RailsのFormBuilderとVuejsの組み合わせをうまく動かすための試行錯誤の結果です。
Rails側がうまくpostされたdataをキャッチするためには、Railsの`FormBuilder`が動的に生成するnameを極力変えない方針で実装。

特に、fileds_forに対して動的な振る舞いを与えることを主眼に置いています。

具体的には、
`#fields_for`に与える`child_index`を、v-bind的なモノと見做してjsコードを混入させ、
`ActionView::Helpers::Tags::Base#add_default_name_and_id`にモンキーパッチを当て、"name"属性を"v-bind:name"属性に読み替えることで駆動しています。
