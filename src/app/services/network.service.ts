/*
 * Polkascan Explorer UI
 * Copyright (C) 2018-2021 Polkascan Foundation (NL)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PolkadaptService } from './polkadapt.service';
import { BlockHarvester } from './block/block.harvester';
import { BlockService } from './block/block.service';
import { RuntimeService } from './runtime/runtime.service';


@Injectable({providedIn: 'root'})
export class NetworkService {
  private settingNetwork: string;
  private settingNonce = 0;
  currentNetwork: BehaviorSubject<string> = new BehaviorSubject('');
  blockHarvester: BlockHarvester;

  constructor(private pa: PolkadaptService,
              private bs: BlockService,
              private rs: RuntimeService) {
  }

  async setNetwork(network: string): Promise<void> {
    // Only if we set a new network, we will continue.
    if (!network || network === this.settingNetwork) {
      return;
    }

    const nonce: number = this.settingNonce = this.settingNonce + 1;
    this.settingNetwork = network;

    if (this.blockHarvester) {
      // Pause the harvester of the previous network.
      this.blockHarvester.pause();
    }

    try {
      await this.pa.setNetwork(network);
    } catch (e) {
      this.currentNetwork.next('');
      console.error('[NetworkService] Could not switch network.', e); // TODO Temporary alert.
    }
    if (network !== this.settingNetwork || this.settingNonce !== nonce) {
      // If network or nonce has changed intermittently (before the 'await' above is resolved), we'll just ignore the
      // rest of this call.
      return;
    }

    // Only the last of concurring calls to this function will continue on the code below.
    if (network) {
      this.blockHarvester = this.bs.getBlockHarvester(network, true);
      if (this.blockHarvester.paused) {
        this.blockHarvester.resume();
      }

      // TODO this.rs.init en destroy.
      this.rs.initialize(network);
    }
    this.currentNetwork.next(network);
  }

  destroy(): void {
    this.pa.clearNetwork();
    this.currentNetwork.next('');
    this.settingNetwork = '';
  }
}
