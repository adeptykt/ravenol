<template>
  <div class="blog">
    <h1>Политика по обработке персональных данных</h1>
    <div class="p" v-bind:class="largescreen">
      <h2>
        Общие положения
      </h2>
      <p>
        Настоящая политика в области обработки и защиты персональных данных (далее - Политика Компании)  ООО «Равенол Якутия» (далее – Компания) разработана в целях обеспечения реализации требований законодательства РФ в области обработки персональных данных субъектов персональных данных.
      </p>
      <p>
        Политика Компании разработана в соответствии со следующими нормативными правовыми актами РФ:
      </p>
      <p>
        1.1. Конституцией Российской Федерации;
      </p>
      <p>
        1.2. Трудовым кодексом Российской Федерации;
      </p>
      <p>
        1.3. Гражданским кодексом Российской Федерации;
      </p>
      <p>
        1.4. Федеральным законом от 19.12.2005 г. №160-ФЗ «О ратификации Конвенции Совета Европы о защите физических лиц при автоматизированной обработке персональных данных»
      </p>
      <p>
        1.5. Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»;
      </p>
      <p>
        1.6. Федеральным законом от 27.07.2006 № 149-ФЗ «Об информации, информационных технологиях и о защите информации»;
      </p>
      <p>
        1.7. Указом Президента Российской Федерации от 06.03.1997 № 188 «Об утверждении Перечня сведений конфиденциального характера» и другими нормативными правовыми актами РФ в области защиты информации и персональных данных.
      </p>
      <p>
        Настоящая Политика Компании распространяется на всех работников Компании, а также на третьих лиц, и является обязательной для исполнения всеми работниками Компании
      </p>
      <p>
        2. Термины и определения, используемые в настоящей Политике Компании.
      </p>
      <ul>
        <p>Персональные данные (ПДн) - любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).</p>
        <li>Обработка персональных данных -  любое действие (операция) или совокупность действий (операций) с персональными данными, совершаемых с использованием средств автоматизации или без их использования. Обработка персональных данных включает в себя, в том числе, сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</li>
        <li>Общедоступные персональные данные – персональные данные, доступ неограниченного круга лиц к которым предоставлен с согласия субъекта персональных данных или на которые в соответствии с федеральными законами не распространяется требование соблюдения конфиденциальности.</li>
        <li>Оператор – юридическое или физическое лицо, организующее и осуществляющее обработку персональных данных, а также определяющее цели и содержание обработки персональных данных.</li>
        <li>ООО «Равенол Якутия» - Оператор,  самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <p>
      </p>
      <p>
      </p>
      <p>
      </p>
      <p>
      </p>
      <p>
        Обновлено «18» августа 2020 г.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sharedState: this.$store.state,
    }
  },
  computed: {
    largescreen: function() {
      return {
        largescreen: !this.$store.state.mobile
      }
    },
  }
}
</script>
<style scoped>
.blog {
  width: 100%;
}
.blog h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 10px 0 20px;
  text-align: center;
}
.blog .largescreen {
  width: 80%;
}
.blog .p {
  margin: 0 auto;
  font-size: 16px;
}
.blog p {
  padding: 10px 0;
  text-align: justify;
}
</style>
