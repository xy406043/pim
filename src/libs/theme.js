
/**
 * 主题相关样式
 */

 /**
  * @description 根节点上改变主题系的颜色
  */
export const changeTheme = (value) => {
    document.getElementById('app').className ='theme_'+value ;
}