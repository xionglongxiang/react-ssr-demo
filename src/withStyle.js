
import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'
function withStyle(Comp, styles){

  function NewComp(props){
    if(props.staticContext){
      props.staticContext.css.push(styles._getCss())
    }
    return <Comp {...props} />
  }
  hoistNonReactStatic(NewComp, Comp)
  // NewComp.loadData = Comp.loadData
  return NewComp
}

export default withStyle