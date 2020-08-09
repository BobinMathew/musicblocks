/**
 * @file This contains the action methods of the Turtle's Singer component's Tone blocks.
 * @author Anindya Kundu
 * @author Walter Bender
 *
 * @copyright 2014-2020 Walter Bender
 * @copyright 2020 Anindya Kundu
 *
 * @license
 * This program is free software; you can redistribute it and/or modify it under the terms of the
 * The GNU Affero General Public License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * You should have received a copy of the GNU Affero General Public License along with this
 * library; if not, write to the Free Software Foundation, 51 Franklin Street, Suite 500 Boston,
 * MA 02110-1335 USA.
*/

/**
 * Sets up all the methods related to different actions for each block in Tone palette.
 *
 * @returns {void}
 */
function setupToneActions() {
    Singer.ToneActions = class {
        /**
         * Selects a voice for the synthesizer.
         *
         * @param {String} instrument - timbre name
         * @param {Number} turtle - Turtle index in turtles.turtleList
         * @param {Number} blk - corresponding Block object in blocks.blockList
         */
        static setTimbre(instrument, turtle, blk) {
            let tur = logo.turtles.ithTurtle(turtle);

            tur.inSetTimbre = true;

            let synth = instrument;
            for (let voice in VOICENAMES) {
                if (VOICENAMES[voice][0] === instrument) {
                    synth = VOICENAMES[voice][1];
                    break;
                } else if (VOICENAMES[voice][1] === instrument) {
                    synth = instrument;
                    break;
                }
            }

            if (logo.inMatrix) {
                logo.pitchTimeMatrix._instrumentName = synth;
            }

            if (tur.singer.instrumentNames.indexOf(synth) === -1) {
                tur.singer.instrumentNames.push(synth);
                logo.synth.loadSynth(turtle, synth);

                if (tur.singer.synthVolume[synth] === undefined) {
                    tur.singer.synthVolume[synth] = [last(Singer.masterVolume)];
                    tur.singer.crescendoInitialVolume[synth] = [last(Singer.masterVolume)];
                }
            }

            let listenerName = "_settimbre_" + turtle;
            if (blk !== undefined && blk in logo.blocks.blockList)
                logo.setDispatchBlock(blk, turtle, listenerName);

            let __listener = event => {
                tur.inSetTimbre = false;
                tur.singer.instrumentNames.pop();
            };

            logo.setTurtleListener(turtle, listenerName, __listener);
        }
    }
}
