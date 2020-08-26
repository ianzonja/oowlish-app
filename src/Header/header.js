import React from 'react'

const header = (props) => 
{
	return(
		<header class="site-header">
  <div class="site-identity">
    <h1><a className="header-link" href="#">Oowlish genious website!</a></h1>
  </div>  
  <nav class="site-navigation">
    <ul class="nav">
      <li><a className="header-link" href="#">Item 1</a></li> 
      <li><a className="header-link" href="#">Item 2</a></li> 
      <li><a className="header-link" href="#">Item 3</a></li> 
    </ul>
  </nav>
</header>
	)
};

export default header;