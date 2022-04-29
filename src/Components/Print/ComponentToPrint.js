import React from 'react';
import { useSelector } from "react-redux";
import GitHubResume from '../PageData/GitHubResume';
import CustomResume from '../PageData/CustomResume';
import Error from '../../pages/Error';
import './ComponentToPrint.css';

export const ComponentToPrint = React.forwardRef((props, ref) => {

  const personalDetails = useSelector(state => state.personalDetails);
  const gitHubUserInfo = useSelector(state => state.gitHubUserInfo);

  return (
    <div className='print-container' style={{ margin: '0', padding: '0' }} ref={ref}>
      {gitHubUserInfo ? <GitHubResume /> : personalDetails ? <CustomResume /> : <Error />}
    </div>
  );
});
