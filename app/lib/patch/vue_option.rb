class VueOption
  def initialize(options)
    @options = options.dup

    config = @options['vue']

    @target_attribute_names =
      case config
      when TrueClass
        %i[id name for value]
      when Array
        Array(config).map(&:to_sym)
      when String, Symbol
        Array(config).map(&:to_sym)
      else
        []
      end
  end

  def has?(attribute_name)
    @target_attribute_names.include?(attribute_name.to_sym)
  end

  def bind
    @target_attribute_names.each(&method(:bind_attr))
  end

  def to_h
    @options.except('vue')
  end

  private

  def bind_attr(attribute_name)
    jscode = @options[attribute_name.to_s]

    if jscode.present?
      # 上書きはしないようにする
      return if @options["v-bind:#{attribute_name}"].present? || @options[":#{attribute_name}"].present?

      # JSのback-quote stringであるのに注意！
      @options["v-bind:#{attribute_name}"] = "\`#{jscode}\`".html_safe
      # @options.delete(attribute_name.to_s)
    end
  end
end
