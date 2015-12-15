angular
  .module('zibble')
  .service('RegexService', RegexService);

function RegexService(){

  this.clean = function(str){

    str = str.split(" ")[0].toLowerCase();
  
    switch (str.match(/[aeiou](?!.*[aeiou])/)[0]){
      case 'a':
      switch (str[str.length - 1]){
        case '1':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ā');
        break;
        case '2':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'á'); 
        break;
        case '3':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǎ'); 
        break;
        case '4':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'à'); 
      }
      break;
      case 'e':
      switch (str[str.length - 1]){
        case '1':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ē');
        break;
        case '2':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'é'); 
        break;
        case '3':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ě'); 
        break;
        case '4':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'è'); 
      }
      break;
      case 'i':
      switch (str[str.length - 1]){
        case '1':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ī');
        break;
        case '2':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'í'); 
        break;
        case '3':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǐ'); 
        break;
        case '4':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ì'); 
      }
      break;
      case 'o':
      switch (str[str.length - 1]){
        case '1':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ō');
        break;
        case '2':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ó'); 
        break;
        case '3':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǒ'); 
        break;
        case '4':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ò'); 
      }
      break;
      case 'u':
      switch (str[str.length - 1]){
        case '1':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ū');
        break;
        case '2':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ú'); 
        break;
        case '3':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǔ'); 
        break;
        case '4':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ù'); 
      }
      break;
      case 'ü':
      switch (str[str.length - 1]){
        case '1':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǖ');
        break;
        case '2':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǘ'); 
        break;
        case '3':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǚ'); 
        break;
        case '4':
        str = str.replace(/[aeiou](?!.*[aeiou])/, 'ǜ'); 
      }
    }
  
    if (str[str.length - 1].match(/\d/)){
      str = str.slice(0, str.length - 1);
    }
    return str;
  }

}
