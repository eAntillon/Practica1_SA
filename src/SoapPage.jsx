import soapRequest from 'easy-soap-request';
import { useState } from 'react';

const url = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso';
const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
};

const cors = 'https://cors-anywhere.herokuapp.com/';
let getXmlValue = function (str, key) {
    return str.substring(
        str.lastIndexOf('<' + key + '>') + ('<' + key + '>').length,
        str.lastIndexOf('</' + key + '>')
    );
};

async function makeRequest(number) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <NumberToDollars xmlns="http://www.dataaccess.com/webservicesserver/">
      <dNum>${number}</dNum>
    </NumberToDollars>
  </soap:Body>
</soap:Envelope>
`;
    const { response } = await soapRequest({
        url: cors + url,
        headers: sampleHeaders,
        xml: xml,
        timeout: 1000,
    });
    return getXmlValue(response.body, 'm:NumberToDollarsResult');
}

const SoapPage = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await makeRequest(input);
        setResponse(res);
    };

    return (
        <div className="w-full md:max-w-screen-xl p-3 md:p-5">
            <div>
                <h1 className="text-3xl font-bold mb-3">
                    SOAP NumberConversion
                </h1>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            className="btn btn-neutral w-40"
                            onClick={handleSubmit}
                        >
                            SOAP Request
                        </button>
                    </div>

                    <div>
                        <div className="stat-title">Response: </div>
                        <p className="text-xl font-bold">{response}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoapPage;
