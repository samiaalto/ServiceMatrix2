import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';

import './styles/ParcelLabel_styles.css';

const ParcelLabel = ({ data }) => {
  const Barcode = require('react-barcode');
  const addonboxes = [];
  let addonCount = 0;
  if (data.labelData.addons.length > 0) {
    for (const [i, addon] of data.labelData.addons.entries()) {
      if (addon.labelMarking !== null && i <= 5) {
        addonboxes.push({ id: i, marking: addon.labelMarking });
        addonCount++;
      }
    }
  }
  if (addonCount < 5) {
    for (let i = addonCount; i < 5; i++) {
      addonboxes.push({ id: i, marking: '' });
    }
  }

  return (
    <>
      <div className="labelPreview">
        <div className="labelBorder">
          <Row>
            <Col className="parties" xs={5}>
              <div className="sender">
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="labelLogo">
                        <b>{'Posti logo'}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {
                          "Description: Printed in blue on address cards supplied by Posti. Printed in black (length: 12mm) in the customer's own address card materials, with a free space of 3mm on the left and the upper edge."
                        }
                      </Tooltip>
                    }>
                    <Col xs={4} className="labelLogo">
                      <svg
                        width="67"
                        height="32"
                        viewBox="0 0 67 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        focusable="false"
                        className="sc-2274bq-0 bEoFZP">
                        <path
                          d="M23.0427 14.6937C23.3181 12.213 25.137 10.4494 27.6732 10.4494C30.2094 10.4494 32.0827 12.213 32.3037 14.6937H36.329C36.0536 10.1197 32.3581 6.59243 27.7276 6.59243C23.0972 6.59243 19.3472 10.1197 19.0718 14.6937H23.0427ZM13.724 15.6859C13.6152 18.3875 11.6298 20.2599 8.98137 20.2599C6.33636 20.2599 4.35089 18.3875 4.29649 15.6859H0.216797V31.4467H4.24211V22.241H4.29649C5.39801 23.342 6.94151 24.1134 9.14795 24.1134C13.8906 24.1134 17.5827 20.5317 17.6949 15.6825L13.724 15.6859ZM4.29649 14.6937C4.51748 12.1586 6.44515 10.4494 8.98137 10.4494C11.5176 10.4494 13.4486 12.213 13.724 14.6937H17.7493C17.4739 10.0654 13.9994 6.59243 9.36894 6.59243C7.1625 6.59243 5.39803 7.41819 4.3509 8.5226H4.24211V6.92545H0.216797V14.6971H4.29649V14.6937ZM60.2565 23.7872H64.2818V15.6859H60.2565V23.7872ZM51.4919 23.7872H55.5172V15.6859H51.4919V23.7872ZM46.8036 15.6859H38.974C39.8001 16.2365 41.1226 16.8991 41.9522 17.2287C43.6045 17.8336 44.213 18.221 44.213 18.9924C44.213 19.7638 43.3325 20.2055 42.2276 20.2055C40.9051 20.2055 39.9667 19.7094 39.0284 18.8836L36.3834 21.5274C37.9269 23.0702 39.5248 24.1168 42.282 24.1168C45.2024 24.1168 48.2349 22.0235 48.2349 18.8802C48.2383 17.504 47.6332 16.4573 46.8036 15.6859ZM32.3615 15.6859C32.2527 18.3875 30.376 20.2599 27.6766 20.2599C25.0316 20.2599 23.1006 18.3297 22.9918 15.6859H18.963C19.0718 20.3686 22.8762 24.1168 27.6188 24.1168C32.3615 24.1168 36.1658 20.3686 36.2746 15.6859H32.3615ZM64.2818 6.92206H60.2565V14.6937H64.2818V6.92206ZM51.4919 14.6937H55.5172V10.4494H59.2093V6.92206H55.5172V0.91748H51.4919V6.92545H48.4593V10.4528H51.4919V14.6937ZM45.7021 14.6937C44.9304 14.1975 43.992 13.8136 43.1659 13.5349C41.6224 12.9844 40.9051 12.597 40.9051 11.7169C40.9051 10.9999 41.6224 10.5037 42.5574 10.5037C43.5501 10.5037 44.5428 10.8911 45.3689 11.6625L47.9596 8.85222C46.4161 7.41819 44.8182 6.6468 42.5574 6.6468C40.2421 6.6468 37.1007 8.46483 37.1007 11.8834C37.1007 13.0422 37.4883 13.9767 38.0935 14.6937H45.7021Z"
                          fill="#3B4A57"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          className="sc-2274bq-4 jFnDyb"></path>
                        <path
                          d="M65.0435 2.26246C65.2203 3.23094 65.0163 4.00232 64.4893 4.38292C64.1323 4.63778 63.67 4.67176 63.3096 4.47127C63.2926 4.46108 63.279 4.45088 63.262 4.44069C63.7175 4.23 64.1493 3.72707 64.4247 3.06103C64.8225 2.09935 64.8361 0.926976 64.0847 0.546381C63.8468 0.424046 63.5714 0.413852 63.296 0.515797C62.9152 0.65852 62.4732 1.07989 62.2624 1.6236C62.0177 1.07989 61.6131 0.65852 61.2289 0.515797C60.9535 0.413852 60.6782 0.424046 60.4402 0.546381C59.6888 0.926976 59.7024 2.09935 60.1002 3.06103C60.3756 3.72707 60.8073 4.2334 61.2629 4.44069C61.2459 4.45088 61.2323 4.46448 61.2153 4.47127C60.855 4.67176 60.3926 4.63778 60.0356 4.38292C59.5052 4.00232 59.3047 3.23094 59.4814 2.26246H58.4955C58.3085 3.53677 58.6587 4.59361 59.4679 5.17469C59.8384 5.43975 60.2736 5.57568 60.7088 5.57568C61.0488 5.57568 61.3887 5.49412 61.6879 5.32421C61.9123 5.19848 62.1027 5.03197 62.2591 4.83827C62.4155 5.03197 62.6024 5.19848 62.8302 5.32421C63.1328 5.49412 63.4694 5.57568 63.8094 5.57568C64.2411 5.57568 64.6797 5.43975 65.0503 5.17469C65.8594 4.59361 66.2096 3.54017 66.0226 2.26586H65.0435V2.26246ZM61.7797 3.26152C61.7797 3.27851 61.7797 3.2955 61.7797 3.31589C61.7695 3.44842 61.7423 3.54017 61.7151 3.57755C61.5961 3.55037 61.2527 3.28191 61.0046 2.68723C60.7258 2.01779 60.804 1.51826 60.8788 1.41971C60.9978 1.4469 61.3411 1.71535 61.5893 2.31003C61.7253 2.63286 61.7729 2.91831 61.7831 3.13579C61.7797 3.17657 61.7763 3.22074 61.7797 3.26152ZM62.8234 3.57415C62.7894 3.52658 62.7622 3.41444 62.7554 3.25812C62.7554 3.21735 62.7554 3.17997 62.7554 3.13919C62.7622 2.9217 62.8132 2.63626 62.9492 2.31003C63.194 1.72215 63.5306 1.45369 63.6564 1.42311C63.7346 1.53865 63.806 2.03138 63.534 2.68723C63.2858 3.27172 62.9458 3.54357 62.8234 3.57415Z"
                          fill="#3B4A57"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          className="sc-2274bq-4 jFnDyb"></path>
                      </svg>
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="serviceName">
                        <b>{'Name of service'}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 10/12 bold'}
                        <br />
                        {'Description: Grouped according to the service-specific models'}
                      </Tooltip>
                    }>
                    <Col xs={7} className="serviceName">
                      {data.labelData.serviceName ? data.labelData.serviceName : 'Postipaketti'}
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="sender-label">
                        <b>{'Header for sender information'}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 6'}
                        <br />
                        {
                          "Description: Addresses of the sender of the Thermaltransfer sticker address label 20 characters per line, A5 laser-printed address label 35 characters per line. In both address labels detachable label part, the sender's addresses 2 x 35 characters."
                        }
                      </Tooltip>
                    }>
                    <div className="sender-label label">Lähettäjä Avsändare From</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderName">
                        <b>{"Sender's name 1"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {"Description: Sender's name"}
                      </Tooltip>
                    }>
                    <div className="senderName">Sandy Sender</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <div className="senderName2"></div>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderAddress1">
                        <b>{"Sender's address 1"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {"Description: Sender's address"}
                      </Tooltip>
                    }>
                    <div className="senderAddress1">Sender Street 123</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <div className="senderAddress2"></div>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderPostalCode">
                        <b>{"Sender's postal code"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {"Description: Sender's postal code with country code prefix"}
                      </Tooltip>
                    }>
                    <Col xs={5} className="senderPostalCode">
                      FI-00230
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderPostOffice">
                        <b>{"Sender's city"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {"Description: Sender's city"}
                      </Tooltip>
                    }>
                    <Col className="senderPostOffice">HELSINKI</Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="senderCountry">
                        <b>{"Sender's country"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {"Description: Sender's country"}
                      </Tooltip>
                    }>
                    <div className="senderCountry">Finland</div>
                  </OverlayTrigger>
                </Row>
              </div>
              <div className="receiver">
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiver-label">
                        <b>{'Header for recpient information'}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 6'}
                        <br />
                        {
                          "Description: Addresses of the sender of the Thermaltransfer sticker address label 20 characters per line, A5 laser-printed address label 35 characters per line. In both address labels detachable label part, the sender's addresses 2 x 35 characters."
                        }
                      </Tooltip>
                    }>
                    <div className="receiver-label label">Vastaanottaja Addressat To</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverName">
                        <b>{"Recipient's name 1"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {"Description: Recipient's name"}
                      </Tooltip>
                    }>
                    <div className="receiverName">Ricky Receiver</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverName2">
                        <b>{"Recipient's name 2"}</b>
                        <br />
                        {'Mandatory: When delivery to a pickup point is chosen'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {'Description: Care Of name of the pickup point'}
                      </Tooltip>
                    }>
                    <div className="receiverName2"></div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverAddress1">
                        <b>{"Recipient's address 1"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {"Description: Recipient's home address or address the pickup point"}
                      </Tooltip>
                    }>
                    <div className="receiverAddress1">Postintaival 7</div>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <div className="receiverAddress2"></div>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverPostalCode">
                        <b>{"Recipient's postal code"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 10 bold'}
                        <br />
                        {
                          "Description: Recipient's postal code or postal code of the pickup point with the country code prefix"
                        }
                      </Tooltip>
                    }>
                    <Col xs={5} className="receiverPostalCode">
                      FI-00230
                    </Col>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverPostOffice">
                        <b>{"Recipient's city"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 10 bold'}
                        <br />
                        {"Description: Recipient's city"}
                      </Tooltip>
                    }>
                    <Col xs={6} className="receiverPostOffice">
                      HELSINKI
                    </Col>
                  </OverlayTrigger>
                </Row>
                <Row>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverCountry">
                        <b>{"Recipient's country"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 10 bold'}
                        <br />
                        {"Description: Recipient's country"}
                      </Tooltip>
                    }>
                    <div className="receiverCountry">Finland</div>
                  </OverlayTrigger>
                </Row>
              </div>
            </Col>
            <Col className="middle" xs={3}>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="processCode">
                      <b>{"The service's process number"}</b>
                      <br />
                      {'Mandatory: Yes'}
                      <br />
                      {'Font size: 20/24 bold'}
                      <br />
                      {'Description: Grouped according to the service-specific models'}
                    </Tooltip>
                  }>
                  <div className="processCode">
                    {data.labelData.processNumber ? data.labelData.processNumber : '16'}
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <Col className="receiverPhone">
                  <Col xs={1} className="phoneIcon">
                    <i className="fas fa-phone-square-alt"></i>
                  </Col>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="receiverPhoneValue">
                        <b>{"The recipient's mobile phone number"}</b>
                        <br />
                        {'Mandatory: Yes'}
                        <br />
                        {'Font size: 8'}
                        <br />
                        {
                          "The recipient's mobile phone number and/or email address has to be given in the EDI message."
                        }
                      </Tooltip>
                    }>
                    <Col xs={5} className="receiverPhoneValue label">
                      04018234990
                    </Col>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Col>
            <Col xs={4} className="product">
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="serviceBarcode">
                      <b>{"The service's product code as a barcode"}</b>
                      <br />
                      {'Mandatory: Yes'}
                      <br />
                      {'6 characters, contain a technical modulo 103 check digit, not visual'}
                      <br />
                      {'FactCode: 2W'}
                      <br />
                      {'Product code: 4 numbers given by Posti'}
                      <br />
                      {'Bar code type: Licence Plate code 128 a, b and c'}
                      <br />
                      {
                        'The first two characters shall produced in type a or b and the remaining four even numbersin type c. It is not mandatory to use type c, if in the address label is space enough to print out longer bar code.'
                      }
                      <br />
                      {
                        'X-value (width of the narrowest bar) 0,42 -0,50 mm (optimal value is 0,46 mm)'
                      }
                      <br />
                      {'The minimum resolution in thermal transfer printer is 200 dots / inch.'}
                      <br />
                      {'The minimum resolution in laser reproduction is 600 dots / inch.'}
                      <br />
                      {
                        'Free space at both sides of the bar code must be at least 5 mmoMinimum height is 20 mm, but when EDI-message is used 12 mm'
                      }
                      <br />
                      {'Use block capitals in bar codes'}
                    </Tooltip>
                  }>
                  <div className="serviceBarcode">
                    <Barcode
                      value={data.service ? '2W' + data.service : '2W2103'}
                      displayValue={false}
                      height={70}
                      width={2}
                    />
                  </div>
                </OverlayTrigger>
              </Row>
              <Row>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="serviceCode">
                      <b>{"The service's product code"}</b>
                      <br />
                      {'Mandatory: Yes'}
                      <br />
                      {'Font size: 10'}
                      <br />
                      {
                        "Description: The service's product code that uses the License Plate 2W -prefix"
                      }
                    </Tooltip>
                  }>
                  <div className="serviceCode">{data.service ? '2W' + data.service : '2W2103'}</div>
                </OverlayTrigger>
              </Row>
              <Row>
                <div className="EDISSI">EDI SSI</div>
              </Row>
              <Row>
                <Col className="dateBox">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="date-label">
                          <b>{'Header for printing date'}</b>
                          <br />
                          {'Mandatory: Yes'}
                          <br />
                          {'Font size: 6'}
                          <br />
                          {'Description: Header for printing date'}
                        </Tooltip>
                      }>
                      <div className="date-label label">Päivämäärä Datum Date</div>
                    </OverlayTrigger>
                  </Row>
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="date">
                          <b>{'Printing date'}</b>
                          <br />
                          {'Mandatory: No'}
                          <br />
                          {'Font size: 8'}
                          <br />
                          {'Description: Printing date in Finnish date format: DD.MM.YYYY'}
                        </Tooltip>
                      }>
                      <div className="date">
                        {data.labelData.dateTime ? data.labelData.dateTime : '18.3.2021'}
                      </div>
                    </OverlayTrigger>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="weight box">
                  <Row>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="weightValue">
                          <b>{'Shipment gross weight'}</b>
                          <br />
                          {'Mandatory: No'}
                          <br />
                          {'Font size: 8'}
                          <br />
                          {'Description: Shipment gross weight'}
                        </Tooltip>
                      }>
                      <Col xs={7} className="weightValue">
                        0,31
                      </Col>
                    </OverlayTrigger>
                    <Col
                      xs={2}
                      className="weightlabel"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-container=".labelPreview"
                      title="<b>Header for shipment gross weight</b></br>Mandatory: Yes</br>Font size: 6</br>Description: Header for shipment gross weight">
                      kg
                    </Col>
                  </Row>
                </Col>
                <Col className="volume box">
                  <Row>
                    <Col
                      xs={7}
                      className="volumeValue"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-container=".labelPreview"
                      title="<b>Shipment volume</b></br>Mandatory: No</br>Font size: 8</br>Description: Shipment volume"></Col>
                    <Col
                      xs={2}
                      className="volumelabel"
                      data-toggle="tooltip"
                      data-placement="top"
                      data-container=".labelPreview"
                      title="<b>Header for shipment volume</b></br>Mandatory: Yes</br>Font size: 6</br>Description: Header for shipment volume">
                      m3
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col className="packages  box">
                  <Row>
                    <Col xs={7} className="packageCount">
                      1
                    </Col>
                    <Col xs={4} className="volumelabel">
                      kpl/st
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="cod">
            <Col xs={4} className="addon box">
              <Row>
                <div className="addon-label label">Lisäpalvelut Tilläggstjänster</div>
              </Row>
              <Row>
                {addonboxes.map((addon) => (
                  <Col className="addonbox">
                    <div className="addonValue" key={'addonbox' + addon.id}>
                      {addon.marking}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={4} className="otherPayer box">
              <Row>
                <div className="otherPayerHeading">
                  Maksaja muu kuin lähettäjä Betalaren annan än avsändaren
                </div>
              </Row>
              <Row>
                <Col className="otherPayerValue">661234</Col>
              </Row>
            </Col>
            <Col className="packages box">
              <Row>
                <div className="addon-label label">kpl st</div>
              </Row>
              <Row>
                <div className="packageCount">1</div>
              </Row>
            </Col>
            <Col className="empty"></Col>
          </Row>
          <Row>
            <Col className="codAmount box">
              <Row>
                <div className="addon-label label">PE-summa PF-belopp</div>
              </Row>
              <Row>
                <div className="codAmountValue"></div>
              </Row>
            </Col>
            <Col className="codIBAN box">
              <Row>
                <div className="addon-label label">Tilinumero Kontonummer</div>
              </Row>
              <Row>
                <div className="codIBANvalue"></div>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={8} className="codReference box">
              <Row>
                <div className="addon-label label">Pankkiviite Bankreferens</div>
              </Row>
              <Row>
                <div className="codReferenceValue"></div>
              </Row>
            </Col>
            <Col className="codBIC box">
              <Row>
                <div className="addon-label label">BIC</div>
              </Row>
              <Row>
                <div className="codBICvalue"></div>
              </Row>
            </Col>
          </Row>
          <Row>
            <div
              className="trackingBarcodeValue"
              data-toggle="tooltip"
              data-placement="top"
              data-container=".labelPreview"
              title="<b>Delivery ID</b></br>Mandatory: Yes</br>Font size: 10</br>Description: Delivery ID that uses the License Plate JJFI prefix. The six last numbers are grouped as an element of their own, and entered in bold when possible.">
              JJFI 699999 12345 678901
            </div>
          </Row>
          <Row>
            <div
              className="trackingBarcode"
              data-toggle="tooltip"
              data-placement="top"
              data-container=".labelPreview"
              title="<b>Delivery ID as a barcode</b></br>Mandatory: Yes</br>Bar code type: Licence Plate code 128 a, b and c</br>The first 5 characters shall produced in type a or b and the remaining 16 even numbersin type c. It is not mandatory to use type c, if in the address label is space enough to print out longer bar code.</br>X-value (width of the narrowest bar) 0,42 -0,50 mm (optimal value is 0,46 mm)</br>The minimum resolution in thermal transfer printer is 200 dots / inch.</br>The minimum resolution in laser reproduction is 600 dots / inch.</br>Free space at both sides of the bar code must be at least 5 mm</br>Minimum height is 25 mm</br>Use block capitals in bar codes">
              <Barcode value="JJFI69999912345678901" displayValue={false} />
            </div>
          </Row>
          <Row>
            <div
              className="trackingBarcodeValue"
              data-toggle="tooltip"
              data-placement="top"
              data-container=".labelPreview"
              title="<b>Delivery ID</b></br>Mandatory: Yes</br>Font size: 10</br>Description: Delivery ID that uses the License Plate JJFI prefix. The six last numbers are grouped as an element of their own, and entered in bold when possible.">
              JJFI 699999 12345 678901
            </div>
          </Row>
          <Row>
            <Col className="additionalInfo">
              <Row>
                <div
                  className="addon-label label"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-container=".labelPreview"
                  title="<b>Header for additional information</b></br>Mandatory: Yes</br>Font size: 6</br>Description: Header for additional information">
                  Lisätiedot Tilläggsuppgifter
                </div>
              </Row>
              <Row>
                <div
                  className="additionalInfoValue"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-container=".labelPreview"
                  title="<b>Additional information</b></br>Mandatory: Yes</br>Font size: 12 Bold</br>Description: The name of the additional service is printed in the data field in large bold letters. If no additional services have been selected, you can print the destination postal code barcode in the data field (except when EDI is used). Otherwise, you can print transport instructions or free-form text in the space.">
                  {data.labelData.addons
                    ? data.labelData.addons.map((addon, i) => (
                        <div key={'addon_' + i}>{addon.labelName.toUpperCase()}</div>
                      ))
                    : ''}
                </div>
              </Row>
              <Row>
                <div className="PostiGreen">Posti Green - ilmastoystävällinen kuljetus</div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ParcelLabel;
