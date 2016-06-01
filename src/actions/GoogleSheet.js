import Spreadsheet from 'google-spreadsheets-append');

import { templateProps } from '../helpers';

export default class GoogleSheet {
  constructor({ auth, fileId, sheetId }) {
    this.spreadsheet = Spreadsheet({
    	auth: auth,
    	fileId,
      sheetId
    });
  }

  appendRow(props, getExtraProps = (() => { return {} })) {

    return (data) => {
      const templatedData = templateProps(props, {...data, ...getExtraProps()});

      spreadsheet.add(templatedData, function(err, res){});
    }

  }
}
