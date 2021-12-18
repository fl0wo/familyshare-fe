import { Helmet } from 'react-helmet';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import React from 'react';
import { connect } from 'react-redux';

const ActivityHistory = (props:any) => {

  function onEventSelect(id:string){
    alert(id);
  }

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <div>
        Ciao Activity History
      </div>

      <div key={'events'}>
        {
          props.user.events.map((e:any)=>(
            <button key={e.title} onClick={()=>onEventSelect(e._id)}>
              {e.title}
            </button>
          ))
        }
      </div>
    </>
  );
};

const mapStateToProps = (state:any) => ({
  ...state
});

export default connect(mapStateToProps)(ActivityHistory);