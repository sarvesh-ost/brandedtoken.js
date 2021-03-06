// Copyright 2019 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ----------------------------------------------------------------------------
//
// http://www.simpletoken.org/
//
// ----------------------------------------------------------------------------

'use strict';

const Mosaic = require('@openstfoundation/mosaic.js');
const BTHelper = require('./helpers/setup/BTHelper');
const UBTHelper = require('./helpers/setup/UBTHelper');
const GCHelper = require('./helpers/setup/GCHelper');

/**
 * The class performs economy setup. Steps of economy setup are listed below:
 *
 *
   |---------------------------------------|---------------------------------------|
   |            Chain-Setup                |               Economy-Setup           |
   |---------------------------------------|---------------------------------------|
   |                       A. Deploy and Prepare Origin EIP-20                     |
   |---------------------------------------|---------------------------------------|
   | 1. Deploy (Token) Organization [Orig] | 1. Deploy (Token) Organization [Orig] |
   | 2. Deploy MockSimpleToken [Orig]      | 2. Deploy Branded Token [Orig]        |
   | * On Mainnet SimpleToken is           |                                       |
   |   already deployed.                   |                                       |
   |---------------------------------------|---------------------------------------|
   |                          B. Deploy Utility Token                              |
   |---------------------------------------|---------------------------------------|
   | 1. Deploy (Token) Organization [Aux]  | 1. Deploy (Token) Organization [Aux]  |
   | 2. Deploy OSTPrime [Aux]              | 2. Deploy Utility Branded Token [Aux] |
   |---------------------------------------|---------------------------------------|
   |                      C. Deploy and Prepare Anchors                            |
   |---------------------------------------|---------------------------------------|
   | 1. Deploy (Anchor) Organization [Orig]| * Do nothing, get address of Anchors  |
   | 2. Deploy Anchor [Orig]               |   deployed during chain-setup         |
   | 3. Deploy (Anchor) Organization [Aux] |                                       |
   | 4. Deploy Anchor & set co-anchor      |                                       |
   |    address. [Aux]                     |                                       |
   | 5. Set Co-Anchor address [Orig]       |                                       |
   |---------------------------------------|---------------------------------------|
   |                               D. Deploy Libs                                  |
   |---------------------------------------|---------------------------------------|
   | 1. Deply MerklePatriciaProof [Both]   | 1. Deply MerklePatriciaProof [Both]   |
   | 2. Deploy MessageBus [Both]           | 2. Deploy MessageBus [Both]           |
   | 3. Deploy GatewayLib [Both]           | 3. Deploy GatewayLib [Both]           |
   |---------------------------------------|---------------------------------------|
   |                             E.  Deploy Gateways                               |
   |---------------------------------------|---------------------------------------|
   | 1. Deploy Gateway [Orig]              | 1. Deploy Gateway [Orig]              |
   | 2. Deploy Cogateway [Aux]             | 2. Deploy Cogateway [Aux]             |
   | 3. Activate Gateway [Orig]            | 3. Activate Gateway [Orig]            |
   |---------------------------------------|---------------------------------------|
   |                        F.  Set Gateway & CoGateway                            |
   |---------------------------------------|---------------------------------------|
   | 1. Set CoGateway in OSTPrime [Aux]    | 1. Set CoGateway in UBT               |
   |                                       | 2. Lift Resctrictions in BT [Orig]    |
   |                                       |    Set Gateway & SimpleStake          |
   |                                       |    (liftRestriction)                  |
   |---------------------------------------|---------------------------------------|
   |                     G.  Deploy GatewayComposer (Optional)                     |
   |---------------------------------------|---------------------------------------|
 *
 */
class EconomySetup extends Mosaic.ChainSetup {
  /**
   * @returns {BTHelper} BTHelper instance.
   */
  static get BrandedTokenHelper() {
    return BTHelper;
  }

  /**
   * @returns {UBTHelper} Returns UBTHelper instance.
   */
  static get UtilityBrandedTokenHelper() {
    return UBTHelper;
  }

  /**
   * @returns {GCHelper} Returns GatewayComposerHelper instance.
   */
  static get GatewayComposerHelper() {
    return GCHelper;
  }
}

module.exports = EconomySetup;
