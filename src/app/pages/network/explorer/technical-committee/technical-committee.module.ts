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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicalCommitteeRoutingModule } from './technical-committee-routing.module';
import { TechnicalCommitteeProposalListComponent } from './proposal/technical-committee-proposal-list/technical-committee-proposal-list.component';
import { TechnicalCommitteeProposalDetailComponent } from './proposal/technical-committee-proposal-detail/technical-committee-proposal-detail.component';


@NgModule({
  declarations: [TechnicalCommitteeProposalListComponent, TechnicalCommitteeProposalDetailComponent],
  imports: [
    CommonModule,
    TechnicalCommitteeRoutingModule
  ]
})
export class TechnicalCommitteeModule { }
