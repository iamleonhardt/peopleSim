/* 
Game Controller
Has a ticker
Measures distance between all object
...tells person all people hes aware of
Every tick, tells person to update(their.awarenessArr)

Pass in awarenessArr as 
{
    Bill_1: {
        distance: 128,
        duration: 1,
        person: {person}
    }, 
    Jeff_5: {
        distance: 29,
        duration: 5,
        person: {person}
    }
}

Person Controller
When told to update

Update position
Update emotion

Draw Self - size, shape, color
Draw Self Voice
Draw Self Stats - loop through speakArr and print each message


Takes in awarenessArr.  
    Compares to long term history
    Compares to short term awareness - anyone new greet







    --- Awareness
    Person walks into awareness range

    Check if person becomes aware of them

    If aware, was I previously aware? Have they been standing near me for a while
        Yes - increment duration of awareness
        No - greet, run away, etc

    If aware, do I previously know them?  In longTermAwareness
        Yes - update last time i've seen them
        No - add to longTerm


    Am I aware?
        Yes -
        No - 
        
        
    Each tick, increment durationSinceLastAware for every person in long term awareness, unless I become aware of them. If theyre in my awareness, reset to 0.



    When I become aware:
        Add to awareness
        Check long term awareness
            If not in there add them

            If theyre in there, how long has it been since I've seen them?
                How can I know how long its been since i've seen them last
                Compare current timestamp to last time I saw them timestamp

                When they leave awareness, set timestamp
                


enter awareness

do i previously know them?
yes - how long has it been since i've seen them? if longer than 250 greet.  if shorter, say "you're back"
no - greet, add to long term




*/
