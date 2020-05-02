<template>
  <div id="toolbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar'
}
</script>

<style lang="scss">
button.bgl-toolbar-button{
  width: 36px;
  height: 36px;
  line-height: 36px;
  border: none;
  font-size: 22px;
  border-radius: 4px;
  cursor: no-drop;
  background: var(--white);
  padding: 2px 10px;

  &:not([disabled]){
    cursor: pointer;
  }

  &:not([disabled]).active:hover{
    box-shadow: 0 0 0 1px var(--text-regular), inset 0 0 0 1px var(--white);
  }

  &:not([disabled]):hover{
    background-color: var(--white);
    box-shadow: inset 0 0 0 1px var(--border-light), inset 0 0 0 2px var(--white), 0 1px 1px var(--border-base);
  }

  &:not([disabled]).active{
    color: var(--white);
    background: var(--text-regular);
  }

  &:not([disabled]):active{
    background-color: var(--text-primary);
    box-shadow: inset 0 0 0 1px var(--border-light), inset 0 0 0 2px var(--white), 0 1px 1px var(--border-base);

    svg{
      fill: var(--white);
    }
  }

  &:focus{
    outline: none;
  }
}

button.bgl-toolbar-normal-button{
  height: 36px;
  margin-right: 8px;
}
</style>

<style scoped lang="scss">
#toolbar {
  height: 56px;
  padding: 4px 8px;
  border-bottom: 1px solid var(--border-light);
  background: var(--white);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 30;
  right: 0;
  top: 0;
  position: -webkit-sticky;
  position: sticky;
  box-sizing: border-box;

  .left{
    display: flex;
    align-items: center;
  }

  .right{
    display: flex;
  }
}

:not([disabled]).active{
  color: var(--white);
  background: var(--text-regular);
  border-color: var(--text-regular);
}
.divider{
  width: 1px;
  height: 30px;
  background: var(--border-light);
  display: block;
  margin: 0 8px;
}

h1{
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 600;
  font-size: 18px;
  position: relative;
}
</style>
