// 中文日期格式助手函数
// Chinese date format helper

hexo.extend.helper.register('chinese_date', function(date, format) {
  const moment = require('moment');
  
  if (!date) return '';
  
  // 设置中文语言环境
  moment.locale('zh-cn');
  
  const m = moment(date);
  
  if (!format) {
    format = 'YYYY年MM月DD日';
  }
  
  return m.format(format);
});

// 中文相对时间
hexo.extend.helper.register('chinese_time_ago', function(date) {
  const moment = require('moment');
  
  if (!date) return '';
  
  moment.locale('zh-cn');
  const m = moment(date);
  
  return m.fromNow();
});

// 中文文章统计
hexo.extend.helper.register('chinese_word_count', function(content) {
  if (!content) return 0;
  
  // 移除HTML标签
  const text = content.replace(/<[^>]*>/g, '');
  
  // 计算中文字符数
  const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  
  // 计算英文单词数
  const englishCount = (text.replace(/[\u4e00-\u9fa5]/g, '').match(/\b\w+\b/g) || []).length;
  
  return chineseCount + englishCount;
});

// 中文阅读时间估算
hexo.extend.helper.register('chinese_reading_time', function(content) {
  const wordCount = hexo.extend.helper.get('chinese_word_count').call(this, content);
  
  // 中文阅读速度大约 400-500 字/分钟
  const readingSpeed = 450;
  
  const minutes = Math.ceil(wordCount / readingSpeed);
  
  if (minutes < 1) {
    return '少于1分钟';
  } else if (minutes === 1) {
    return '约1分钟';
  } else {
    return `约${minutes}分钟`;
  }
});
