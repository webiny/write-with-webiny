import { createI18n } from 'vue-i18n'

const en = {
  home: 'Home',
  multilingual: 'VUE MULTILINGUAL BLOG',
  loading: 'Loading...',
  error: 'An error occured...'
}

const fr = {
  home: 'Accueil',
  multilingual: 'BLOG MULTILINGUE en VUE js',
  loading: 'Chargement...',
  error: 'Une erreur est survenue...'
}

const messages = {
  en,
  fr
}

const i18n = createI18n({
  locale: 'en',
  messages
})

export default i18n
