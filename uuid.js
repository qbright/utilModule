/**
 * Created with WebStorm.
 * User: zqbright
 * Date: 2015/4/7 0007
 * Time: 17:15
 * To change this template use File | Settings | File Templates.
 */



/**---------------------   UUID START ----------------------------------------------- */
/**
 * uuid.js - Version 0.2 JavaScript Class to create a UUID like identifier
 * Copyright (C) 2006-2008, Erik Giberti (AF-Design), All rights reserved. This
 * program is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version. This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * The latest version of this file can be downloaded from
 * http://www.af-design.com/resources/javascript_uuid.php
 *
 * HISTORY: 6/5/06 - Initial Release 5/22/08 - Updated code to run faster,
 * removed randrange(min,max) in favor of a simpler rand(max) function. Reduced
 * overhead by using getTime() method of date class (suggestion by James Hall).
 *
 * KNOWN ISSUES: - Still no way to get MAC address in JavaScript - Research into
 * other versions of UUID show promising possibilities (more research needed) -
 * Documentation needs improvement
 *
 */

define(function () {
    var YA_UUID = {
        "generate32": function () {
            var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
            var dc = new Date();
            var t = dc.getTime() - dg.getTime();

            var h = '';
            var tl = this.generateBits(t, 0, 31);
            var tm = this.generateBits(t, 32, 47);
            var thv = this.generateBits(t, 48, 59) + '1'; // version 1, security version is 2
            var csar = this.generateBits(this.rand(4095), 0, 7);
            var csl = this.generateBits(this.rand(4095), 0, 7);

            var n = this.generateBits(this.rand(8191), 0, 7) +
                this.generateBits(this.rand(8191), 8, 15) +
                this.generateBits(this.rand(8191), 0, 7) +
                this.generateBits(this.rand(8191), 8, 15) +
                this.generateBits(this.rand(8191), 0, 15); // this last number is two octets long
            return tl + h + tm + h + thv + h + csar + csl + h + n;
        },
        /**
         * GENERAL METHODS (Not instance specific) Pull out only certain bits from a
         * very large integer, used to get the time code information for the first part
         * of a UUID. Will return zero's if there aren't enough bits to shift where it
         * needs to.
         */
        "generateBits": function (val, start, end) {
            var base16 = this.returnBase(val, 16);
            var quadArray = new Array();
            var quadString = '';
            var i = 0;
            for (i = 0; i < base16.length; i++) {
                quadArray.push(base16.substring(i, i + 1));
            }
            for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
                if (!quadArray[i] || quadArray[i] == '') quadString += '0';
                else quadString += quadArray[i];
            }
            return quadString;
        },

        /**
         * Numeric Base Conversion algorithm from irt.org In base 16: 0=0, 5=5, 10=A,
         * 15=F Copyright 1996-2006 irt.org, All Rights Reserved. Downloaded from:
         * http://www.irt.org/script/146.htm modified to work in this class by Erik
         * Giberti
         */
        "returnBase": function (number, base) {
            var convert = [
                '0', '1', '2', '3', '4', '5', '6', '7', '8',
                '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
                'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ];
            if (number < base) {
                var output = convert[number];
            } else {
                var MSD = '' + Math.floor(number / base);
                var LSD = number - MSD * base;
                if (MSD >= base) var output = this.returnBase(MSD, base) + convert[LSD];
                else var output = convert[MSD] + convert[LSD];
            }
            return output;
        },

        /**
         * pick a random number within a range of numbers
         * int b rand(int a); where 0 <= b <= a
         */
        "rand": function (max) {
            return Math.floor(Math.random() * max);
        }
    };


    return YA_UUID;
});