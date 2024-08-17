import en from '@/i18n/languages/en.json';
import tr from '@/i18n/languages/tr.json';
 
type Messages = typeof en & typeof tr;
 
declare global {
  interface IntlMessages extends Messages {}
}