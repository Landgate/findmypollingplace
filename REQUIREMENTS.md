1. User loads the map and has access to an input box linked to Google's Address Searching API (as used in Google Maps itself)

2. User enters their address and it zooms to its location.

3. Four lookups are done via the API to determine:

    - The closest school / polling place [1] to the user's address.
        - And then a marker is drawn on the map at its location (???) "correct. And also include the distance to the school/polling place."

    - The state electorate [2] the user's address resides in. "yes"
        - And then a marker / boundary for the LGA is drawn on the map (???). "yes for the electorate (not the LGA) and in the response (pop up) it should say what electorate they reside in and the electorate of the polling place."

    - The state electorate [3] the school / polling place point [1] resides in.

4. If the state electorate [3] that the user's address and school / polling place [2] reside in don't match then an alert is displayed to the user.

"(ALERT – Your nearest School / Polling Place is outside of your electorate. If you intend to lodge a vote at this school you will need to submit and absent tee vote)” "Correct"


Note: I have the WAEC polling place data in the Democracy Sausage GME instance if you'd like to use the actual data :) "Would be nice but lets leave it at schools for now in the example."
