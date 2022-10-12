import React, {useContext} from 'react';
import AppContext from "../lib/AppContext";

function Categories(props) {
  const {categories} = props
  const context = useContext(AppContext)
  const {category} = context.state
  return (
    <div className="catMenu">
      {categories.length &&
        categories.map((cat, index) => {
          return (
            <a key={index} className={`${category === cat.id ? 'active' : ''}`}
               onClick={() => context.setCategory(cat.id)}
            >{cat.name}</a>
          )
        })
      }
      <a className={`${category === 'All' ? 'active' : ''}`}
         onClick={() => context.setCategory('All')}
      >All</a>
    </div>
  );
}

export default Categories;