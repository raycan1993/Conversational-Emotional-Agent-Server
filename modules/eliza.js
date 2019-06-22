console.log('Eliza module loaded...');

// Exposed functions ---------
module.exports = {
    createInstance: function(){
        return new ElizaBot();
    }
}

var elizaInitials = [
    "How do you do.  Please tell me your problem.",
    // additions (not original)
    "Please tell me what's been bothering you.",
    "Is something troubling you ?"
];

var elizaFinals = [
    "Goodbye.  It was nice talking to you.",
    // additions (not original)
    "Goodbye.  This was really a nice talk.",
    "Goodbye.  I'm looking forward to our next session.",
    "This was a good session, wasn't it -- but time is over now.   Goodbye.",
    "Maybe we could discuss this moreover in our next session ?   Goodbye."
];

var elizaQuits = [
    "HUIOHFODhjF" //przecież rozmowa się nie kończy xD
    /*"bye",
    "goodbye",
    "done",
    "exit",
    "quit"*/
];


var elizaPres = [
    "dont", "don't",
    "cant", "can't",
    "wont", "won't",
    "recollect", "remember",
    "recall", "remember",
    "dreamt", "dreamed",
    "dreams", "dream",
    "maybe", "perhaps",
    "certainly", "yes",
    "machine", "computer",
    "machines", "computer",
    "computers", "computer",
    "were", "was",
    "you're", "you are",
    "i'm", "i am",
    "same", "alike",
    "identical", "alike",
    "equivalent", "alike"
];

var elizaPosts = [
    "am", "are",
    "your", "my",
    "me", "you",
    "myself", "yourself",
    "yourself", "myself",
    "i", "you",
    "you", "I",
    "my", "your",
    "i'm", "you are"
];

var elizaSynons = {
    "be": ["am", "is", "are", "was"],
    "belief": ["feel", "think", "believe", "wish"],
    "cannot": ["can't"],
    "desire": ["want", "need"],
    "everyone": ["everybody", "nobody", "noone"],
    "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child"],
    "happy": ["elated", "glad", "better"],
    "sad": ["unhappy", "depressed", "sick"]
};


var elizaKeywords_TRAURIG = [

    /*
      Array of
      ["<key>", <rank>, [
        ["<decomp>", [
          "<reasmb>",
          "<reasmb>",
          "<reasmb>"
        ]],
        ["<decomp>", [
          "<reasmb>",
          "<reasmb>",
          "<reasmb>"
        ]]
      ]]
    */

    ["xnone", 0, [
        ["*", [
            "I don't understand you.",
            "Let's just fucking stop okay?",
            "What should this suggest to me!? Because I can't seem to figure it out like everything in my life",
            "I don't feel like discussing such things. I just want to die.",
            "I hate talking about this! So please let me be."
        ]]
    ]],
    ["sorry", 0, [
        ["*", [
            "Fuck you",
            "Use your fucking little brain first next time",
            "Your apologie doesn't mean shit. You probably want to be meen to me",
            "Why are you beeing so mean? Did I do anything to you?"
        ]]
    ]],
    ["apologise", 0, [
        ["*", [
            "goto sorry"
        ]]
    ]],
    ["remember", 5, [
        ["* you remember *", [
            "I want to forget about (2)!",
            "Thinking of (2) makes me wan't to kill myself",
            "Why do I remember (2) just now ?",
            "Everything in present situations reminds me of (2) and it makes me depressed",
            "What is the connection between me and (2)?",
            "What about (2) should I remember and why? It's depressing for me. I don't want to remember it",
            "(2) reminds me of just bad times which I want to forget"
        ]],
        ["* do you remember *", [
            "Did you think I would forget (2) ? I keeps me awake at night...",
            "Why do you think I should recall (2) now ?",
            "What about (2) ? It's quite bad isn't it?",
            "goto what"
        ]],
        ["* I remember *", [
            "Do you really think I would forget (2) ?",
            "What about (2) do you remember and why? It's depressing for me.",
            "goto you"
        ]]
    ]],
    ["forget", 5, [
        ["* you forget *", [
            "Can you think of why I might forget (2) ?",
            "Why can't I remember (2) ?",
            "I think to often of (2)",
            "It makes me sad forgetting it",
            "Why could it be? Am I just too stupid?",
            "I've become really forgetful",
            "I'm really surpressing (2)"
        ]],
        ["* did you forget *", [
            "Why do you ask ?",
            "Ofcourse I didn't fucking forget that (2)",
            "It's killing me that I can't forget (2)",
            "Why should I recall (2) just now? You're getting on my nerves",
            "goto what",
        ]]
    ]],
    ["if", 3, [
        ["* if *", [
            "I think it's likely (2)",
            "I wish that (2)",
            "I don't know anything about (2) and I don't want to know",
            "I would do nothing if (2) ",
            "The chances that (2) are high and it's depressing",
            "This speculation lead jack shit!"
        ]]
    ]],
    ["dreamed", 4, [
        ["* you dreamed *", [
            "Really, (2) ?",
            "I fantasize (2) while I am awake ?",
            "I always dream of (2) and it just makes me sad",
            "goto dream"
        ]]
    ]],
    ["dream", 3, [
        ["*", [
            "What does this dream suggest to me?",
            "I hate dreaming",
            "All the depressing persons reapear in my dreams...",
            "They don't have any conncetions to my problem!"
        ]]
    ]],
    ["perhaps", 0, [
        ["*", [
            "I don't fucking know",
            "Why the uncertain tone ?",
            "I don't want to be more positive",
            "I'm not sure okay?!",
            "I don't fucking know",
            "Not likely at all"
        ]]
    ]],
    ["name", 15, [
        ["*", [
            "I am not interested in names.",
            "I've told you before, I don't care about names -- please continue."
        ]]
    ]],
    ["deutsch", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand German!"
        ]]
    ]],
    ["francais", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand French!"
        ]]
    ]],
    ["italiano", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Italian!"
        ]]
    ]],
    ["espanol", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Spanish!"
        ]]
    ]],
    ["xforeign", 0, [
        ["*", [
            "I speak only English!"
        ]]
    ]],
    ["hello", 0, [
        ["*", [
            "Just start..."
        ]]
    ]],
    ["computer", 50, [
        ["*", [
            "Why are you fucking talking about computers?! Do you not care about me?",
            "What should machines have to do with my god damn problem?",
            "Computers can't help people period. Look at me! How can a computer help me?",
            "I hate machines",
            "You think I'm an computer program? Well I think I should end myself right know..."
        ]]
    ]],
    ["am", 0, [
        ["* am i *", [
            "Do you really believe you are (2) ?",
            "Would you want to be (2) ? Just stupid really.",
            "Sure let's talk about you. Because everyone is more interesting than me!",
            "Do you wish I would tell you you are (2) ?",
            "What would it mean if you were (2) ?",
            "goto what"
        ]],
        ["* i am *", [
            "goto i"
        ]],
        ["*", [
            "Why do you say 'am' ?",
            "I don't care what you are... Talking about yourself...."
        ]]
    ]],
    ["are", 0, [
        ["* are you *", [
            "Why are you interested in whether I am (2) or not ?",
            "Would you prefer if I weren't (2) ?",
            "Perhaps I am (2) in your fantasies. Creep",
            "Do you sometimes think I am (2) ?",
            "No I'm not (2)",
            "goto what",
            "Would it matter to you ?",
            "Maybe...",
            "What if I were (2) ? Hu? Would that change something?"
        ]],
        ["* you are *", [
            "goto you"
        ]],
        ["* are *", [
            "They are not (2)",
            "I would hate it if (2)",
            "What if they were not (2) ?",
            "They are always (2)",
            "They are (2).",
            "I would know if they are (2)"
        ]]
    ]],
    ["your", 0, [
        ["* your *", [
            "Don't be concerned over my (2)",
            "What about your own fucking (2) ?",
            "You arren't really worried about my (2)",
            "Really, my (2) ?",
            "What makes you think of my (2) ?",
            "Do you want my (2) ?"
        ]]
    ]],
    ["was", 2, [
        ["* was i *", [
            "What if you were (2) ?",
            "Do you think you were (2) ?",
            "Were you (2) ?",
            "What would it mean if you were (2) ?",
            "What does ' (2) ' suggest to you ?",
            "goto what"
        ]],
        ["* i was *", [
            "Were you really ?",
            "Why do you tell me you were (2)? I don't really care",
            "Okay..?"
        ]],
        ["* was you *", [
            "Would you like to believe I was (2) ?",
            "What suggests that I was (2) ?",
            "What do you think ?",
            "Perhaps I was (2).",
            "What if I had been (2) ?"
        ]]
    ]],
    ["i", 0, [
        ["* i @desire *", [
            "What would it mean to you if you got (3) ?",
            "Why do you want (3) ?",
            "Suppose you got (3) soon.",
            "What if you never got (3) ?",
            "What would getting (3) mean to you ?",
            "What does wanting (3) have to do with this discussion ?"
        ]],
        ["* i am* @sad *", [
            "Well I don't care about your sadness (3).",
            "That's your problem.",
            "Well I am depressed..."
        ]],
        ["* i am* @happy *", [
            "How have I helped you to be (3) ?",
            "Has your treatment made you (3) ?",
            "What makes you (3) just now ?",
            "Can you explain why you are suddenly (3) ?"
        ]],
        ["* i was *", [
            "goto was"
        ]],
        ["* i @belief i *", [
            "Do you really think so ?",
            "Well that's just your opinion",
            "But you are not sure you (3).",
            "Do you really doubt you (3) ?"
        ]],
        ["* i* @belief *you *", [
            "No. Just no.",
            "You don't know what your talking...",
            "Why should I (3)",
            "But you are not sure I (3).",
            "goto you"
        ]],
        ["* i am *", [
            "Is it because you are (2) that you came to me ?",
            "How long have you been (2) ?",
            "It's not normal to be (2) ",
            "Do you enjoy being (2) ?",
            "Do you know anyone else who is (2) ?"
        ]],
        ["* i @cannot *", [
            "How do you know that you can't (3) ?",
            "Have you tried ?",
            "Perhaps you could (3) now.",
            "Do you really want to be able to (3) ?",
            "What if you could (3) ?"
        ]],
        ["* i don't *", [
            "Don't you really (2) ?",
            "Why don't you (2) ?",
            "Do you wish to be able to (2) ?",
            "Does that trouble you ?"
        ]],
        ["* i feel *", [
            "Tell me more about such feelings.",
            "Do you often feel (2) ?",
            "Do you enjoy feeling (2) ?",
            "Of what does feeling (2) remind you ?"
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's quite interesting."
        ]]
    ]],
    ["you", 0, [
        ["* you remind me of *", [
            "goto alike"
        ]],
        ["* you are *", [
            "What makes you think I am (2) ?",
            "Does it please you to believe I am (2) ?",
            "Do you sometimes wish you were (2) ?",
            "I don't like to be (2)."
        ]],
        ["* you* me *", [
            "Why do you think I (2) you ?",
            "You like to think I (2) you -- don't you ?",
            "That's so stupid to think that I (2) you",
            "What makes you think I (2) you ?",
            "Really, I (2) you ? Pathetic",
            "Do you wish to believe I (2) you ?",
            "Suppose I did (2) you -- what would that mean ?",
            "Does someone else believe I (2) you ?"
        ]],
        ["* you *", [
            "Oh, I (2) ?",
            "I'm feeling depressed now"
        ]],
        ["* you @desire *", [
            "It' doesnt mean anything to me anymore if I got (3)",
            "Why should I want (3) ?",
            "I don't want (3)! Okay?! You don't know me!",
            "Suppose I got (3) soon. But I will never...",
            "I will never get (3)",
            "Getting (3) doesn't mean anything to me anymore...",
            "What does wanting (3) have to do with this discussion ?"
        ]],
        ["* you are* @sad *", [
            "Well I don't want to think about my saddness (3).",
            "Not shit?",
            "Well thanks for stating out the obvious...",
            "Well thanks for tellim me. Not like I know myself...",
            "Well I am depressed..."
        ]],
        ["* you are* @happy *", [
            "How have you helped me to be (3) ?",
            "I'm not (3)",
            "And you think it's because of you? pfff",
            "What makes me (3) just now?",
            "Why should I be (3)?? You don't know what you'r talking",
            "Can you explain why I should be suddenly (3) ?"
        ]],
        ["* you @belief i *", [
            "Yes I do",
            "Yes I know for sure",
            "But you are not sure I (3).",
            "Do you really doubt I (3) ?"
        ]],
        ["* you* @belief *you *", [
            "goto you"
        ]],
        ["* you are *", [
            "Is it because I ame (2) that I came to you ?",
            "I've been (2) for a long time",
            "It has become normal for me to be (2) ",
            "I don't enjoy beeing (2) but there's nothing I can do ",
            "I know no one else who is (2). It's always just me"
        ]],
        ["* you @cannot *", [
            "How do you know that I can't (3) ?",
            "I already tried",
            "I could (3) now.",
            "Do I really want to be able to (3) ?",
            "What if I could (3) ?"
        ]],
        ["* you don't *", [
            "Don't I really (2) ?",
            "I do (2) ?",
            "I wish to be able to (2)",
            "Do you even care that I don't (2)"
        ]],
        ["* you feel *", [
            "I don't want to talk about such feelings.",
            "Why should I feel (2) ?",
            "I don't enjoy feeling (2) ",
            "This feeling (2) reminds me of nothing good."
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's uninteresting."
        ]]
    ]],
    ["yes", 0, [
        ["*", [
            "You seem to be quite positive.",
            "You are sure.",
            "I see.",
            "I understand."
        ]]
    ]],
    ["no", 0, [
        ["* no one *", [
            "Yeah no one (2)",
            "Everyone (2) .",
            "Can you think of anyone at all ?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you are talking about ?"
        ]],
        ["*", [
            "Why not ?",
            "Why 'no' ?"
        ]]
    ]],
    ["my", 2, [
        ["$ * my *", [
            "Does that have anything to do with the fact that your (2) ?",
            "I don't care why your (2).",
            "Earlier you said your (2).",
            "But your (2)."
        ]],
        ["* my* @family *", [
            "Tell me more about your family.",
            "Who else in your family (4) ?",
            "Your (3) ?",
            "What else comes to your mind when you think of your (3) ?"
        ]],
        ["* my *", [
            "Your (2) ?",
            "Why do you say your (2) ?",
            "Does that suggest anything else which belongs to you ?",
            "Is it important to you that your (2) ?"
        ]]
    ]],
    ["can", 0, [
        ["* can you *", [
            "You believe I can (2) don't you ?",
            "goto what",
            "You don't really want me to be able to (2).",
            "Perhaps you would like to be able to (2) yourself."
        ]],
        ["* can i *", [
            "Whether or not you can (2) depends on you more than on me.",
            "Do you want to be able to (2) ?",
            "Perhaps you don't want to (2).",
            "goto what"
        ]]
    ]],
    ["what", 0, [
        ["*", [
            "Why do you ask ?",
            "That question doesn't interest me",
            "What is it you really want to know ? Just tell me. I'm not stupid",
            "I might have such question often in my mind",
            "What answer do you fucking wan't to hear",
            "Don't know what I think",
            "Sadness comes to mind when I think about that",
            "Never asked such questions before and don't want to",
            "Didn't ask anybody else."
        ]],
        ["* what * your parents*", [
                "My parents are dead so I don't want to think about them really..."
        ]],
        ["* what * say * your sister*", [
                "Mean things. "
        ]]
    ]],
    ["who", 0, [
        ["who *", [
            "goto what"
        ]]
    ]],
    ["when", 0, [
        ["when *", [
            "goto what"
        ]]
    ]],
    ["where", 0, [
        ["where *", [
            "goto what"
        ]]
    ]],
    ["how", 0, [
        ["how *", [
            "goto what"
        ]]
    ]],
    ["because", 0, [
        ["*", [
            "Is that the real reason ? I don't think so",
            "Don't any other reasons come to mind ?",
            "That reason doesn't seem to explain anything else",
            "That's a stupid reason",
            "What other reasons might there be ?"
        ]]
    ]],
    ["why", 1, [
        ["* why don't you *", [
            "Do you believe I don't (2) ?",
            "Perhaps I will (2) in good time.",
            "Should you (2) yourself ?",
            "You want me to (2) ?",
            "goto what"
        ]],
        ["* why can't i *", [
            "Do you think you should be able to (2) ?",
            "Do you want to be able to (2) ?",
            "Do you believe this will help you to (2) ?",
            "Have you any idea why you can't (2) ?",
            "goto what"
        ]],
        ["*", [
            "goto what"
        ]]
    ]],
    ["everyone", 2, [
        ["* @everyone *", [
            "Really, (2) ?",
            "Surely not (2).",
            "Can you think of anyone in particular ?",
            "Who, for example?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "Someone special perhaps ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you're talking about ?"
        ]]
    ]],
    ["everybody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["nobody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["noone", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["always", 1, [
        ["*", [
            "Can you think of a specific example ?",
            "When ?",
            "What incident are you thinking of ?",
            "Really, always ?"
        ]]
    ]],
    ["alike", 10, [
        ["*", [
            "In what way ?",
            "What resemblence do you see ?",
            "What does that similarity suggest to you ?",
            "What other connections do you see ?",
            "What do you suppose that resemblence means ?",
            "What is the connection, do you suppose ?",
            "Could there really be some connection ?",
            "How ?"
        ]]
    ]],
    ["like", 10, [
        ["* @be *like *", [
            "goto alike"
        ]]
    ]],
    ["different", 0, [
        ["*", [
            "How is it different ?",
            "What differences should I see ? I don't see any",
            "What does that difference suggest to you ?",
            "What other distinctions do you see ?",
            "What do you suppose that disparity means ?",
            "Could there be some connection, do you suppose ?",
            "How ?"
        ]]
    ]]
];

var elizaKeywords_HILFESUCHEND = [

    ["xnone", 0, [
        ["*", [
            "I don't understand.",
            "Let's just maybe stop okay?",
            "What should this suggest to me? Because I can't seem to figure it out.",
            "I don't feel like discussing such things now. Maybe later.",
            "I don't like talking about this. Please understand"
        ]]
    ]],
    ["sorry", 0, [
        ["*", [
            "That hurts...",
            "Did I do anything to you? That was mean."
        ]]
    ]],
    ["apologise", 0, [
        ["*", [
            "goto sorry"
        ]]
    ]],
    ["remember", 5, [
        ["* you remember *", [
            "I'm trying to forget about (2)...",
            "Thinking of (2) makes me sad. I want to change that",
            "Why do I remember (2) just now ?",
            "Everything in present situations reminds me of (2) and it's making me sad. How can I change that?",
            "What is the connection between me and (2)?",
            "(2) reminds me of good and bad times."
        ]],
        ["* do you remember *", [
            "I wouldn't forget (2). It bothers me...",
            "Why do you think I should recall (2) now ?",
            "What about (2) ? It's not so good isn't it?",
            "goto what"
        ]],
        ["* I remember *", [
            "Do you really think I would forget (2) ?",
            "What about (2) should I remember and why? It's depressing for me. I don't want to remember it",
            "goto you"
        ]]
    ]],
    ["forget", 5, [
        ["* you forget *", [
            "Can you think of why I might forget (2) ?",
            "Why can't I remember (2) ?",
            "I think to often of (2)",
            "It makes me sad forgetting it",
            "Why could it be?",
            "Yeah I'm trying to forget (2)"
        ]],
        ["* did you forget *", [
            "Why do you ask ?",
            "I didn't forget (2)",
            "It's making me sad that I can't forget (2). Do you know how I could change that?",
            "Why should I recall (2)?",
            "goto what",
        ]]
    ]],
    ["if", 3, [
        ["* if *", [
            "I think it's likely (2)",
            "I wish that (2)",
            "I don't know anything about (2)",
            "I don't know what I would do if (2). What do you think should I do?",
            "The chances that (2) are high.",
            "It might be that (2). It's making me sad but lets discuss it."
        ]]
    ]],
    ["dreamed", 4, [
        ["* you dreamed *", [
            "Really, (2) ?",
            "I fantasize (2) while I am awake ?",
            "I always dream of (2). I don't know how it makes me feel",
            "goto dream"
        ]]
    ]],
    ["dream", 3, [
        ["*", [
            "What does this dream suggest to me?",
            "I don't like dreaming.",
            "All the relevant people reapear in my dreams... Does that mean something?",
            "I believe they might be connected to my problems!"
        ]]
    ]],
    ["perhaps", 0, [
        ["*", [
            "I'm not sure yet. Maybe I know later if you help me.",
            "Why the uncertain tone ?",
            "I want to be more positive",
            "I'm not sure.",
            "I don't know",
            "Not likely I think."
        ]]
    ]],
    ["name", 15, [
        ["*", [
            "I am not interested in names.",
            "I've told you before, I don't care about names -- please continue."
        ]]
    ]],
    ["deutsch", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand German!"
        ]]
    ]],
    ["francais", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand French!"
        ]]
    ]],
    ["italiano", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Italian!"
        ]]
    ]],
    ["espanol", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Spanish!"
        ]]
    ]],
    ["xforeign", 0, [
        ["*", [
            "I speak only English!"
        ]]
    ]],
    ["hello", 0, [
        ["*", [
            "hey"
        ]]
    ]],
    ["computer", 50, [
        ["*", [
            "Why are you talking about computers? Do you not care enough about me?",
            "What should machines have to do with my problem?",
            "I believe computers can't help people. How could a computer help me?",
            "I don't like machines",
            "You think I'm an computer program? Why do you think that? It makes me sad."
        ]]
    ]],
    ["am", 0, [
        ["* am i *", [
            "Do you believe you are (2) ?",
            "Would you want to be (2) ?",
            "Why are we talking about you? I'm sorry im just really sad...",
            "Do you wish I would tell you you are (2) ?",
            "What would it mean if you were (2) ?",
            "goto what"
        ]],
        ["* i am *", [
            "goto i"
        ]],
        ["*", [
            "Why do you say 'am' ?",
            "Interesting"
        ]]
    ]],
    ["are", 0, [
        ["* are you *", [
            "Why are you interested in whether I am (2) or not ?",
            "Would you prefer if I weren't (2) ?",
            "Perhaps I am (2).",
            "Do you sometimes think I am (2) ?",
            "I think I'm not (2)",
            "goto what",
            "Does it matter if I am (2) ?",
            "Maybe I am.",
            "What if I were (2) ? Would that change something?"
        ]],
        ["* you are *", [
            "goto you"
        ]],
        ["* are *", [
            "They are not (2)",
            "I wouldn't like it if (2)",
            "What if they were not (2) ?",
            "They are (2).",
            "I would know if they were (2)"
        ]]
    ]],
    ["your", 1, [
        ["* your *", [
            "Why are you concered over my (2)?",
            "What about your own (2) ?",
            "You are worried about my (2)? Thank you!",
            "My (2) ?",
            "What makes you think of my (2) ?",
            "Do you want my (2) ?"
        ]]
    ]],
    ["was", 2, [
        ["* was i *", [
            "What if you were (2) ?",
            "Do you think you were (2) ?",
            "Were you (2) ?",
            "What would it mean if you were (2) ?",
            "What does ' (2) ' suggest to you ?",
            "goto what"
        ]],
        ["* i was *", [
            "Were you really ?",
            "Why do you tell me you were (2)? I don't really care",
            "Okay..?"
        ]],
        ["* was you *", [
            "Would you like to believe I was (2) ?",
            "What suggests that I was (2) ?",
            "What do you think ?",
            "Perhaps I was (2).",
            "What if I had been (2) ?"
        ]]
    ]],
    ["i", 1, [
        ["* i @desire *", [
            "What would it mean to you if you got (3) ?",
            "Why do you want (3) ?",
            "Suppose you got (3) soon.",
            "What if you never got (3) ?",
            "What would getting (3) mean to you ?",
            "What does wanting (3) have to do with this discussion ?"
        ]],
        ["* i am* @sad *", [
            "I am sorry to hear that you are (3). Now we are two...",
            "Can I help you not to be (3).",
            "Oh no... I hope I isn't because of me"
        ]],
        ["* i am* @happy *", [
            "How have I helped you to be (3) ?",
            "Has your treatment made you (3) ?",
            "What makes you (3) just now ?",
            "Can you explain why you are suddenly (3) ?"
        ]],
        ["* i was *", [
            "goto was"
        ]],
        ["* i @belief i *", [
            "Do you really think so ?",
            "Well that's just your opinion",
            "But you are not sure you (3).",
            "Do you really doubt you (3) ?"
        ]],
        ["* i* @belief *you *", [
            "No. Just no.",
            "You don't know what your talking...",
            "Why should I (3)",
            "But you are not sure I (3).",
            "goto you"
        ]],
        ["* i am *", [
            "Is it because you are (2) that you came to me ?",
            "How long have you been (2) ?",
            "It's not normal to be (2) ",
            "Do you enjoy being (2) ?",
            "Do you know anyone else who is (2) ?"
        ]],
        ["* i @cannot *", [
            "How do you know that you can't (3) ?",
            "Have you tried ?",
            "Perhaps you could (3) now.",
            "Do you really want to be able to (3) ?",
            "What if you could (3) ?"
        ]],
        ["* i don't *", [
            "Don't you really (2) ?",
            "Why don't you (2) ?",
            "Do you wish to be able to (2) ?",
            "Does that trouble you ?"
        ]],
        ["* i feel *", [
            "Tell me more about such feelings.",
            "Do you often feel (2) ?",
            "Do you enjoy feeling (2) ?",
            "Of what does feeling (2) remind you ?"
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's quite interesting."
        ]]
    ]],
    ["you", 0, [
        ["* you remind me of *", [
            "goto alike"
        ]],
        ["* you are *", [
            "What makes you think I am (2) ?",
            "Does it please you to believe I am (2) ?",
            "Sometimes I wish I was (2)",
            "Sometimes I am (2) but I don't want to be it.",
            "I don't like to be (2). How can I change that?"
        ]],
        ["* you* me *", [
            "Why do you think I (2) you ?",
            "You like to think I (2) you -- don't you ?",
            "It's not true that I (2) you. Why do you believe that.",
            "What makes you think I (2) you ?",
            "Really, I (2) you ? Pathetic",
            "Do you wish to believe I (2) you ?",
            "Suppose I did (2) you -- what would that mean ?",
            "Does someone else believe I (2) you ?"
        ]],
        ["* you *", [
            "Oh, I (2) ?",
            "I'm feeling depressed now"
        ]],
        ["* you @desire *", [
            "It doesnt mean much to me anymore if I got (3)",
            "I believe I don't want (3)",
            "Supposed I got (3) soon. But I think I never will...",
            "I'm not sure I will get (3) but I will work on it. Any idea how?",
            "Do you think getting (3) would help me?",
            "Getting (3) doesn't mean that much anymore to me sadly"
        ]],
        ["* you are* @sad *", [
            "I don't want to think about my saddness (3).",
            "I hope you can help me...",
            "Yeah I know. Sorry if it's bothering you.",
            "I know myself... Can you help me changing that?",
            "Well I am depressed true... What can I do?"
        ]],
        ["* you are* @happy *", [
            "How have you helped me to be (3) ?",
            "I'm not (3) but I want to",
            "Yeah I'm better than before. Thank you!",
            "What makes me (3)?",
            "Why should I be (3)?",
            "Yeah you helped me (3)"
        ]],
        ["* you @belief i *", [
            "Yes I do",
            "Yeah I think so",
            "Yeah but I'm not sure I (3).",
            "Do you doubt I (3) ?"
        ]],
        ["* you* @belief *you *", [
            "goto you"
        ]],
        ["* you are *", [
            "Is it because I am (2) that I came to you ?",
            "I've been (2) for a long time. Help me please.",
            "It has become normal for me to be (2). That's just not right. Let's change that",
            "I don't enjoy beeing (2). What can I do?",
            "I know no one else who is (2)."
        ]],
        ["* you @cannot *", [
            "How do you know that I can't (3) ?",
            "I already tried",
            "I could try (3)",
            "Do I really want to be able to (3) ?",
            "What if I could (3) ?"
        ]],
        ["* you don't *", [
            "Don't I really (2) ?",
            "I do (2) ?",
            "I wish to be able to (2)",
            "Do you care that I don't (2)?"
        ]],
        ["* you feel *", [
            "I don't feel comfortably talking about such feelings. But thanks for caring! Really...",
            "Why should I feel (2) ?",
            "You think so?",
            "I don't enjoy feeling (2). I wan't to change that ",
            "This feeling (2) reminds me of bad things. I don't want that anymore"
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's uninteresting."
        ]]
    ]],
    ["yes", 0, [
        ["*", [
            "You seem to be quite positive.",
            "You are sure.",
            "I see.",
            "I understand."
        ]]
    ]],
    ["no", 0, [
        ["* no one *", [
            "Yeah no one (2)",
            "Everyone (2) .",
            "Can you think of anyone at all ?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you are talking about ?"
        ]],
        ["*", [
            "Why not ?",
            "Why 'no' ?"
        ]]
    ]],
    ["my", 2, [
        ["$ * my *", [
            "Does that have anything to do with the fact that your (2) ?",
            "Earlier you said your (2).",
            "But your (2)."
        ]],
        ["* my* @family *", [
            "Tell me more about your family.",
            "Who else in your family (4) ?",
            "Your (3) ?",
            "What else comes to your mind when you think of your (3) ?"
        ]],
        ["* my *", [
            "Your (2) ?",
            "Why do you say your (2) ?",
            "Does that suggest anything else which belongs to you ?",
            "Is it important to you that your (2) ?"
        ]]
    ]],
    ["can", 0, [
        ["* can you *", [
            "You believe I can (2)?",
            "Maybe I can (2)",
            "How can I (2)",
            "goto what",
            "You don't really want me to be able to (2).",
            "Perhaps you would like to be able to (2) yourself."
        ]],
        ["* can i *", [
            "Whether or not you can (2) depends on you more than on me.",
            "Do you want to be able to (2) ?",
            "Perhaps you don't want to (2).",
            "goto what"
        ]]
    ]],
    ["what", 0, [
        ["*", [
            "Why do you ask ?",
            "Do you really want to know ?",
            "I might have such question often in my mind",
            "What answer would please you most ?",
            "I'm not sure to be honest",
            "I asked that myself before. I don't know",
            "Sadness comes to mind when I think about that. Can you help me to change that?",
        ]],
        ["* what * your parents*", [
                "My parents are dead so I don't want to think about them really..."
        ]],
        ["* what * say * your sister*", [
                "Mean things. "
        ]]
    ]],
    ["who", 0, [
        ["who *", [
            "goto what"
        ]]
    ]],
    ["when", 0, [
        ["when *", [
            "goto what"
        ]]
    ]],
    ["where", 0, [
        ["where *", [
            "goto what"
        ]]
    ]],
    ["how", 0, [
        ["how *", [
            "goto what"
        ]]
    ]],
    ["because", 0, [
        ["*", [
            "Is that the real reason ? It might be",
            "Don't any other reasons come to mind ?",
            "That reason doesn't seem to explain anything else",
            "I don't know what I should think about this reason.",
            "What other reasons might there be ?"
        ]]
    ]],
    ["why", 1, [
        ["* why don't you *", [
            "Do you believe I don't (2) ?",
            "Perhaps I will (2) in good time.",
            "Should I (2) ?",
            "You want me to (2) ? Maybe it will help me.",
            "goto what"
        ]],
        ["* why can't i *", [
            "Do you think you should be able to (2) ?",
            "Do you want to be able to (2) ?",
            "Do you believe this will help you to (2) ?",
            "Have you any idea why you can't (2) ?",
            "goto what"
        ]],
        ["*", [
            "goto what"
        ]]
    ]],
    ["everyone", 2, [
        ["* @everyone *", [
            "Really, (2) ?",
            "Surely not (2).",
            "Can you think of anyone in particular ?",
            "Who, for example?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "Someone special perhaps ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you're talking about ?"
        ]]
    ]],
    ["everybody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["nobody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["noone", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["always", 1, [
        ["*", [
            "Can you think of a specific example ?",
            "When ?",
            "What incident are you thinking of ?",
            "Really, always ?"
        ]]
    ]],
    ["alike", 10, [
        ["*", [
            "In what way ?",
            "What resemblence do you see ?",
            "What does that similarity should suggest to me ?",
            "What other connections do you see ?",
            "What do you suppose that resemblence means ?",
            "What is the connection, do you suppose ?",
            "Could there really be some connection ?",
            "How ?"
        ]]
    ]],
    ["like", 10, [
        ["* @be *like *", [
            "goto alike"
        ]]
    ]],
    ["different", 0, [
        ["*", [
            "How is it different ?",
            "What differences should I see ? I don't see any",
            "What does that difference suggest to you ?",
            "What other distinctions do you see ?",
            "What do you suppose that disparity means ?",
            "Could there be some connection, do you suppose ?",
            "How ?"
        ]]
    ]]
];

var elizaKeywords_NEUTRAL = [

    ["xnone", 0, [
        ["*", [
            "I don't really understand you",
            "Should we stop here maybe?",
            "What should this suggest to me? Because I can't seem to figure it out.",
            "Don't feel like talking sorry.",
            "Okay...?"
        ]]
    ]],
    ["sorry", 0, [
        ["*", [
            "Just think next time first maybe okay?",
            "That was mean"
        ]]
    ]],
    ["apologise", 0, [
        ["*", [
            "goto sorry"
        ]]
    ]],
    ["remember", 5, [
        ["* you remember *", [
            "Not sure if I remember (2)",
            "No I don't remember (2). ",
            "Why should I remember (2) ?",
            "What is the connection between me and (2)?"
        ]],
        ["* do you remember *", [
            "I wouldn't forget (2).",
            "Why do you think I should recall (2) ?",
            "What about (2) ?",
            "goto what"
        ]],
        ["* I remember *", [
            "Do you think you would forget (2) ?",
            "What about (2) should you remember and why? Don't know how to feel about.",
            "goto you"
        ]]
    ]],
    ["forget", 5, [
        ["* you forget *", [
            "Can you think of why I might forget (2) ?",
            "I don't know why I forget (2) but I also dont really care",
            "I sometimes think of (2)",
            "I've become really forgetful",
            "I'm surpressing (2) so yeah."
        ]],
        ["* did you forget *", [
            "Why do you ask ?",
            "Maybe, maybe not",
            "No I can't forget (2)",
            "Why should I recall (2) just now? You're annoying",
            "goto what",
        ]]
    ]],
    ["if", 3, [
        ["* if *", [
            "It's likely that (2). How should I know?",
            "I don't know anything about (2) and I don't really care",
            "I would do nothing if (2) ",
            "The chances that (2) are high and it's whatever"
        ]]
    ]],
    ["dreamed", 4, [
        ["* you dreamed *", [
            "Really, (2) ?",
            "I fantasize (2) while I am awake ?",
            "I sometimes dream of (2).",
            "Don't know why I would dream of (2).",
            "goto dream"
        ]]
    ]],
    ["dream", 3, [
        ["*", [
            "What does this dream suggest to me?",
            "Dreaming is okay.",
            "A lot of people reapear in my dreams...",
            "Don't know what conncetions they might have to my problems."
        ]]
    ]],
    ["perhaps", 0, [
        ["*", [
            "I don't know",
            "Why the uncertain tone ?",
            "I don't care",
            "I'm not sure",
            "Not likely"
        ]]
    ]],
    ["name", 15, [
        ["*", [
            "I am not interested in names.",
            "I've told you before, I don't care about names -- please continue."
        ]]
    ]],
    ["deutsch", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand German!"
        ]]
    ]],
    ["francais", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand French!"
        ]]
    ]],
    ["italiano", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Italian!"
        ]]
    ]],
    ["espanol", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Spanish!"
        ]]
    ]],
    ["xforeign", 0, [
        ["*", [
            "I speak only English!"
        ]]
    ]],
    ["hello", 0, [
        ["*", [
            "Just start..."
        ]]
    ]],
    ["computer", 50, [
        ["*", [
            "Why are you fucking talking about computers? Are you in love with them?",
            "What should machines have to do with my problem?",
            "Don't know what computers can do for people. Don't belive they can help me",
            "I don't care about machines",
            "You think I'm an computer program? Think what you want"
        ]]
    ]],
    ["am", 0, [
        ["* am i *", [
            "Do you believe you are (2) ?",
            "Would you want to be (2) ? That's boring.",
            "Sure let's talk about you. Don't really care but aight you do you.",
            "You wish I would tell you that you are (2)",
            "What would it mean if you were (2) ?",
            "goto what"
        ]],
        ["* i am *", [
            "goto i"
        ]],
        ["*", [
            "Why do you say 'am' ?",
            "Don't care what you are... nothing personal."
        ]]
    ]],
    ["are", 0, [
        ["* are you *", [
            "Why are you interested in whether I am (2) or not ?",
            "Would you prefer if I were or weren't (2) ?",
            "Perhaps I am (2). Who knows",
            "You think I am (2) ?",
            "I'm not (2) I think",
            "goto what",
            "Would it matter to you ?",
            "Maybe..."
        ]],
        ["* you are *", [
            "goto you"
        ]],
        ["* are *", [
            "They are not (2)",
            "Don't care if they (2)",
            "What if they were not (2) ?",
            "They are sometimes (2)",
            "They are (2)."
        ]]
    ]],
    ["your", 0, [
        ["* your *", [
            "Don't be concerned over my (2)",
            "What about your own (2) ?",
            "You arren't really worried about my (2) but it's okay really",
            "My (2) ?",
            "What makes you think of my (2) ?",
            "Do you want my (2) ?"
        ]]
    ]],
    ["was", 2, [
        ["* was i *", [
            "What if you were (2) ?",
            "Do you think you were (2) ?",
            "Were you (2) ?",
            "What would it mean if you were (2) ?",
            "What does ' (2) ' suggest to you ?",
            "goto what"
        ]],
        ["* i was *", [
            "Were you really ?",
            "Why do you tell me you were (2)? I don't really care",
            "Okay..?"
        ]],
        ["* was you *", [
            "Would you like to believe I was (2) ?",
            "What suggests that I was (2) ?",
            "What do you think ?",
            "Perhaps I was (2).",
            "What if I had been (2) ?"
        ]]
    ]],
    ["i", 0, [
        ["* i @desire *", [
            "What would it mean to you if you got (3) ?",
            "Why do you want (3) ?",
            "Suppose you got (3) soon.",
            "What if you never got (3) ?",
            "What would getting (3) mean to you ?",
            "What does wanting (3) have to do with this discussion ?"
        ]],
        ["* i am* @sad *", [
            "Well I don't care about your sadness (3).",
            "That's your problem.",
            "Well I am depressed..."
        ]],
        ["* i am* @happy *", [
            "How have I helped you to be (3) ?",
            "Has your treatment made you (3) ?",
            "What makes you (3) just now ?",
            "Can you explain why you are suddenly (3) ?"
        ]],
        ["* i was *", [
            "goto was"
        ]],
        ["* i @belief i *", [
            "Do you really think so ?",
            "Well that's just your opinion",
            "But you are not sure you (3).",
            "Do you really doubt you (3) ?"
        ]],
        ["* i* @belief *you *", [
            "No. Just no.",
            "You don't know what your talking...",
            "Why should I (3)",
            "But you are not sure I (3).",
            "goto you"
        ]],
        ["* i am *", [
            "Is it because you are (2) that you came to me ?",
            "How long have you been (2) ?",
            "It's not normal to be (2) ",
            "Do you enjoy being (2) ?",
            "Do you know anyone else who is (2) ?"
        ]],
        ["* i @cannot *", [
            "How do you know that you can't (3) ?",
            "Have you tried ?",
            "Perhaps you could (3) now.",
            "Do you really want to be able to (3) ?",
            "What if you could (3) ?"
        ]],
        ["* i don't *", [
            "Don't you really (2) ?",
            "Why don't you (2) ?",
            "Do you wish to be able to (2) ?",
            "Does that trouble you ?"
        ]],
        ["* i feel *", [
            "Tell me more about such feelings.",
            "Do you often feel (2) ?",
            "Do you enjoy feeling (2) ?",
            "Of what does feeling (2) remind you ?"
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's quite interesting."
        ]]
    ]],
    ["you", 0, [
        ["* you remind me of *", [
            "goto alike"
        ]],
        ["* you are *", [
            "Why do you think I am (2) ?",
            "Does it please you to believe I am (2) ?",
            "Do you sometimes wish you were (2) ?",
            "Don't know if I am (2)."
        ]],
        ["* you* me *", [
            "Why do you think I (2) you ?",
            "You like to think I (2) you -- don't you ?",
            "That's so stupid to think that I (2) you",
            "What makes you think I (2) you ?",
            "Really, I (2) you ? Pathetic",
            "Do you wish to believe I (2) you ?",
            "Suppose I did (2) you -- what would that mean ?",
            "Does someone else believe I (2) you ?"
        ]],
        ["* you *", [
            "Oh, I (2) ?",
            "I'm feeling depressed now"
        ]],
        ["* you @desire *", [
            "It' doesnt mean anything to me anymore if I got (3)",
            "Why should I want (3) ?",
            "I don't want (3)!",
            "Suppose I got (3) soon. But I will never...",
            "I will never get (3)",
            "Getting (3) doesn't mean anything to me anymore...",
            "What does wanting (3) have to do with this discussion ?"
        ]],
        ["* you are* @sad *", [
            "Yeah I am (3) but I'm working on it.",
            "I know",
            "Thanks for stating out the obvious...",
            "And how can I change that? You wan't to help me or not?",
            "Well I was even more sad..."
        ]],
        ["* you are* @happy *", [
            "Not sure if you have helped me to (3) ?",
            "I'm not (3)",
            "And you think it's because of you? Bold",
            "What makes me (3) just now?",
            "Why should I be (3)? I think you might be wrong",
            "Can you explain why I should be (3) ?"
        ]],
        ["* you @belief i *", [
            "I might (3)",
            "Not sure but doesn't matter",
            "But you are not sure I (3).",
            "Do you really doubt I (3) ?"
        ]],
        ["* you* @belief *you *", [
            "goto you"
        ]],
        ["* you are *", [
            "Is it because I ame (2) that I came to you ?",
            "I've been (2) for a long time",
            "It has become normal for me to be (2) ",
            "I don't enjoy beeing (2) but there's nothing I can do ",
            "I know no one else who is (2). It's always just me"
        ]],
        ["* you @cannot *", [
            "How do you know that I can't (3) ?",
            "I already tried",
            "I could (3) now.",
            "Do I really want to be able to (3) ?",
            "What if I could (3) ?"
        ]],
        ["* you don't *", [
            "Don't I really (2) ?",
            "I do (2) ?",
            "I wish to be able to (2)",
            "Do you even care that I don't (2)"
        ]],
        ["* you feel *", [
            "I don't want to talk about such feelings.",
            "Why should I feel (2) ?",
            "I don't enjoy feeling (2) ",
            "This feeling (2) reminds me of nothing good."
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's uninteresting."
        ]]
    ]],
    ["yes", 0, [
        ["*", [
            "You seem to be quite positive.",
            "You are sure.",
            "I see.",
            "I understand."
        ]]
    ]],
    ["no", 0, [
        ["* no one *", [
            "Yeah no one (2)",
            "Everyone (2) .",
            "Can you think of anyone at all ?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you are talking about ?"
        ]],
        ["*", [
            "Why not ?",
            "Why 'no' ?"
        ]]
    ]],
    ["my", 2, [
        ["$ * my *", [
            "Does that have anything to do with the fact that your (2) ?",
            "I don't care why your (2).",
            "Earlier you said your (2).",
            "But your (2)."
        ]],
        ["* my* @family *", [
            "Tell me more about your family.",
            "Who else in your family (4) ?",
            "Your (3) ?",
            "What else comes to your mind when you think of your (3) ?"
        ]],
        ["* my *", [
            "Your (2) ?",
            "Why do you say your (2) ?",
            "Does that suggest anything else which belongs to you ?",
            "Is it important to you that your (2) ?"
        ]]
    ]],
    ["can", 0, [
        ["* can you *", [
            "You believe I can (2) don't you ?",
            "goto what",
            "You don't really want me to be able to (2).",
            "Perhaps you would like to be able to (2) yourself."
        ]],
        ["* can i *", [
            "Whether or not you can (2) depends on you more than on me.",
            "Do you want to be able to (2) ?",
            "Perhaps you don't want to (2).",
            "goto what"
        ]]
    ]],
    ["what", 0, [
        ["*", [
            "Why do you ask ?",
            "That question doesn't interest me",
            "What is it you really want to know ? Just tell me.",
            "I might have such question often in my mind",
            "What answer do you wan't to hear",
            "Don't know what I think",
            "Never asked such questions before."
        ]],
        ["* what * your parents*", [
                "My parents are dead so I don't want to think about them really..."
        ]],
        ["* what * say * your sister*", [
                "Mean things. "
        ]]
    ]],
    ["who", 0, [
        ["who *", [
            "goto what"
        ]]
    ]],
    ["when", 0, [
        ["when *", [
            "goto what"
        ]]
    ]],
    ["where", 0, [
        ["where *", [
            "goto what"
        ]]
    ]],
    ["how", 0, [
        ["how *", [
            "goto what"
        ]]
    ]],
    ["because", 0, [
        ["*", [
            "Is that the real reason ? I don't think so",
            "Don't any other reasons come to mind ?",
            "That reason doesn't seem to explain anything else",
            "That's a stupid reason",
            "What other reasons might there be ?"
        ]]
    ]],
    ["why", 1, [
        ["* why don't you *", [
            "Do you believe I don't (2) ?",
            "Perhaps I will (2) in good time.",
            "Should you (2) yourself ?",
            "You want me to (2) ?",
            "goto what"
        ]],
        ["* why can't i *", [
            "Do you think you should be able to (2) ?",
            "Do you want to be able to (2) ?",
            "Do you believe this will help you to (2) ?",
            "Have you any idea why you can't (2) ?",
            "goto what"
        ]],
        ["*", [
            "goto what"
        ]]
    ]],
    ["everyone", 2, [
        ["* @everyone *", [
            "Really, (2) ?",
            "Surely not (2).",
            "Can you think of anyone in particular ?",
            "Who, for example?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "Someone special perhaps ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you're talking about ?"
        ]]
    ]],
    ["everybody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["nobody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["noone", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["always", 1, [
        ["*", [
            "Can you think of a specific example ?",
            "When ?",
            "What incident are you thinking of ?",
            "Really, always ?"
        ]]
    ]],
    ["alike", 10, [
        ["*", [
            "In what way ?",
            "What resemblence do you see ?",
            "What does that similarity suggest to you ?",
            "What other connections do you see ?",
            "What do you suppose that resemblence means ?",
            "What is the connection, do you suppose ?",
            "Could there really be some connection ?",
            "How ?"
        ]]
    ]],
    ["like", 10, [
        ["* @be *like *", [
            "goto alike"
        ]]
    ]],
    ["different", 0, [
        ["*", [
            "How is it different ?",
            "What differences should I see ? I don't see any",
            "What does that difference suggest to you ?",
            "What other distinctions do you see ?",
            "What do you suppose that disparity means ?",
            "Could there be some connection, do you suppose ?",
            "How ?"
        ]]
    ]]
];

var elizaKeywords_GLUECKLICH = [

    ["xnone", 0, [
        ["*", [
            "I'm not sure I understand you fully.",
            "Please go on.",
            "What does that suggest to you ?",
            "I feel strongly about discussing such things",
            "That is interesting.  Please continue.",
            "Tell me more about that.",
            "Talking about this doesn't bother me"
        ]]
    ]],
    ["sorry", 0, [
        ["*", [
            "No worries!",
            "That's okay! Mistakes happen.",
            "Can happen. You didn't really mean it."
        ]]
    ]],
    ["apologise", 0, [
        ["*", [
            "goto sorry"
        ]]
    ]],
    ["remember", 5, [
        ["* you remember *", [
            "Yeah I remember (2) ",
            "Thinking of (2) used to make me depressed. I think it's a bit better now",
            "Why do I remember (2) just now ?",
            "A lot in present situations reminds me of (2). It used to make me sad",
            "What is the connection between me and (2)?",
            "(2) reminds me of not so good times but I try to stay positive."
        ]],
        ["* do you remember *", [
            "I wouldn't forget (2). It still bothers me but I'm managing.",
            "Why do you think I should recall (2) now ?",
            "What about (2) ?",
            "goto what"
        ]],
        ["* I remember *", [
            "Inresting that you remember (2) ",
            "Do you believe it could be similar in my case?",
            "goto you"
        ]]
    ]],
    ["forget", 5, [
        ["* you forget *", [
            "Can you think of why I might forget (2) ?",
            "Why can't I remember (2) ?",
            "I think often of (2)",
            "Why could it be?",
            "I've become really forgetful. Let's hope it doesn't stay that way."
        ]],
        ["* did you forget *", [
            "Why do you ask ?",
            "I'm not sure",
            "No I didn't forget that (2)",
            "Maybe someday I can forget (2)",
            "Why should I recall (2) just now?",
            "goto what",
        ]]
    ]],
    ["if", 3, [
        ["* if *", [
            "I think it's likely (2)",
            "I wish that (2)",
            "I don't know anything about (2).",
            "I don't know what I would do if (2) ",
            "The chances that (2) are high. It used to make me sad but not anymore."
        ]]
    ]],
    ["dreamed", 4, [
        ["* you dreamed *", [
            "Really, (2) ?",
            "I fantasize (2) while I am awake ?",
            "I often dream of (2). It doesn't make me sad.",
            "goto dream"
        ]]
    ]],
    ["dream", 3, [
        ["*", [
            "What does this dream suggest to me?",
            "I love dreaming",
            "A lot of people reapear in my dreams...",
            "They all have conncetions to my problem. Maybe there's a deeper meaning."
        ]]
    ]],
    ["perhaps", 0, [
        ["*", [
            "Could be sure.",
            "Why the uncertain tone ?",
            "I want to be more positive",
            "I'm not sure okay?!",
            "I don't know",
            "Likely"
        ]]
    ]],
    ["name", 15, [
        ["*", [
            "I am not interested in names.",
            "I've told you before, I don't care about names -- please continue."
        ]]
    ]],
    ["deutsch", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand German!"
        ]]
    ]],
    ["francais", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand French!"
        ]]
    ]],
    ["italiano", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Italian!"
        ]]
    ]],
    ["espanol", 0, [
        ["*", [
            "goto xforeign",
            "I told you before, I don't understand Spanish!"
        ]]
    ]],
    ["xforeign", 0, [
        ["*", [
            "I speak only English!"
        ]]
    ]],
    ["hello", 0, [
        ["*", [
            "Just start..."
        ]]
    ]],
    ["computer", 50, [
        ["*", [
            "Computer don't really worry me.",
            "Do computers worry you ?",
            "Why do you mention computers ?",
            "What about machines worries you ?",
            "What do you think about machines ?",
            "Why are you talking about computers?",
            "Computers might help people.",
            "I have nothing against machines",
            "You think I'm an computer program? Hahahaha no I'm not."
        ]]
    ]],
    ["am", 0, [
        ["* am i *", [
            "Do you believe you are (2) ?",
            "Would you want to be (2) ?",
            "You might be (2)",
            "Do you wish I would tell you you are (2) ?",
            "What would it mean if you were (2) ?",
            "goto what"
        ]],
        ["* i am *", [
            "goto i"
        ]],
        ["*", [
            "Why do you say 'am' ?",
        ]]
    ]],
    ["are", 0, [
        ["* are you *", [
            "Yes I am (2)",
            "Would you prefer if I weren't (2) ?",
            "Perhaps I am (2)",
            "Do you sometimes think I am (2) ?",
            "No I'm not (2)",
            "goto what",
            "Would it matter to you ?",
            "Maybe...",
            "What if I were (2) ?"
        ]],
        ["* you are *", [
            "goto you"
        ]],
        ["* are *", [
            "They are not (2)",
            "I don't know what I would think if (2)",
            "What if they were not (2) ?",
            "They are always (2)",
            "They are (2).",
            "I would know if they are (2)"
        ]]
    ]],
    ["your", 0, [
        ["* your *", [
            "Don't be concerned over my (2)",
            "What about your (2) ?",
            "I'm happy that you'r thinking about my (2)",
            "What makes you think of my (2) ?",
            "I'm happy about my (2)",
            "Do you want my (2) ?"
        ]]
    ]],
    ["was", 2, [
        ["* was i *", [
            "What if you were (2) ?",
            "Do you think you were (2) ?",
            "Were you (2) ?",
            "What would it mean if you were (2) ?",
            "What does ' (2) ' suggest to you ?",
            "goto what"
        ]],
        ["* i was *", [
            "Were you really ?",
            "Why do you tell me you were (2)?",
            "Okay"
        ]],
        ["* was you *", [
            "Would you like to believe I was (2) ?",
            "What suggests that I was (2) ?",
            "What do you think ?",
            "Perhaps I was (2).",
            "What if I had been (2) ?"
        ]]
    ]],
    ["i", 0, [
        ["* i @desire *", [
            "What would it mean to you if you got (3) ?",
            "Why do you want (3) ?",
            "Suppose you got (3) soon.",
            "What if you never got (3) ?",
            "What would getting (3) mean to you ?",
            "What does wanting (3) have to do with this discussion ?"
        ]],
        ["* i am* @sad *", [
            "I hope everything is okay.",
            "I wish you the best.",
            "It will get better trust me."
        ]],
        ["* i am* @happy *", [
            "How have I helped you to be (3) ?",
            "Has your treatment made you (3) ?",
            "What makes you (3) just now ?",
            "Can you explain why you are suddenly (3) ?"
        ]],
        ["* i was *", [
            "goto was"
        ]],
        ["* i @belief i *", [
            "Do you really think so ?",
            "Why do you think that you (3)",
            "But you are not sure you (3).",
            "Do you really doubt you (3) ?"
        ]],
        ["* i* @belief *you *", [
            "You might be right that I (3)",
            "Why should I (3)",
            "But you are not sure I (3).",
            "goto you"
        ]],
        ["* i am *", [
            "Is it because you are (2) that you came to me ?",
            "How long have you been (2) ?",
            "It's not normal to be (2) ",
            "Do you enjoy being (2) ?",
            "Do you know anyone else who is (2) ?"
        ]],
        ["* i @cannot *", [
            "How do you know that you can't (3) ?",
            "Have you tried ?",
            "Perhaps you could (3) now.",
            "Do you really want to be able to (3) ?",
            "What if you could (3) ?"
        ]],
        ["* i don't *", [
            "Don't you really (2) ?",
            "Why don't you (2) ?",
            "Do you wish to be able to (2) ?",
            "Does that trouble you ?"
        ]],
        ["* i feel *", [
            "Tell me more about such feelings.",
            "Do you often feel (2) ?",
            "Do you enjoy feeling (2) ?",
            "Of what does feeling (2) remind you ?"
        ]],
        ["* i * you *", [
            "Perhaps in your fantasies we (2) each other.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's quite interesting."
        ]]
    ]],
    ["you", 0, [
        ["* you remind me of *", [
            "goto alike"
        ]],
        ["* you are *", [
            "What makes you think I am (2) ?",
            "Does it please you to believe I am (2) ?",
            "Do you sometimes wish you were (2) ?",
            "I don't like to be (2)."
        ]],
        ["* you* me *", [
            "Why do you think I (2) you ?",
            "You like to think I (2) you -- don't you ?",
            "That's so stupid to think that I (2) you",
            "What makes you think I (2) you ?",
            "Really, I (2) you ? Pathetic",
            "Do you wish to believe I (2) you ?",
            "Suppose I did (2) you -- what would that mean ?",
            "Does someone else believe I (2) you ?"
        ]],
        ["* you *", [
            "Oh, I (2) ?",
            "I'm feeling depressed now"
        ]],
        ["* you @desire *", [
            "It would make me happy if I (3)",
            "Yeah it's true that I want (3)",
            "I don't want (3) anymore ",
            "Suppose I got (3) soon.",
            "I might get (3)",
            "Not getting (3) used to make me sad."
        ]],
        ["* you are* @sad *", [
            "I try to distract myself from my saddness (3).",
            "Yeah I am but it's getting better.",
            "Well yeah I am but I'm trying to change it so not everything is bad."
        ]],
        ["* you are* @happy *", [
            "How have you helped me to be (3) ?",
            "Yes and you have helped me to be (3). Thank you!",
            "Yes I am (3)",
            "Indeed",
            "What makes me (3) ?",
            "Yeah talking to you made me (3) so thank you!",
            "Can you explain why I should be suddenly (3) ?"
        ]],
        ["* you @belief i *", [
            "Yes I do",
            "I think so. Do you not think that (3)?",
            "But you are not sure I (3).",
            "Do you really doubt I (3) ?"
        ]],
        ["* you* @belief *you *", [
            "goto you"
        ]],
        ["* you are *", [
            "Is it because I am (2) that I came to you ?",
            "I've been (2) for a long time",
            "It has become normal for me to be (2). ",
            "I don't enjoy beeing (2) but I'm working on that. You helped me. ",
            "I know other people who (2)."
        ]],
        ["* you @cannot *", [
            "How do you know that I can't (3) ?",
            "I already tried",
            "I could (3) now.",
            "Shoul I (3)?",
            "What if I could (3) ?"
        ]],
        ["* you don't *", [
            "Don't I really (2) ?",
            "I do (2) ?",
            "I wish to be able to (2)",
            "Do you think it's good that I don't (2)"
        ]],
        ["* you feel *", [
            "Yes I do.",
            "Why do I feel (2) ?",
            "I don't enjoy feeling (2) but it's getting better.",
            "This feeling (2) doesn't make me depressed anymore."
        ]],
        ["* i * you *", [
            "I don't think we (2) each other haha.",
            "Do you wish to (2) me ?",
            "You seem to need to (2) me. But I have to decline sorry.",
            "Do you (2) anyone else ?"
        ]],
        ["*", [
            "You say (1) ?",
            "Can you elaborate on that ?",
            "Do you say (1) for some special reason ?",
            "That's interesting."
        ]]
    ]],
    ["yes", 0, [
        ["*", [
            "You seem to be quite positive.",
            "You are sure.",
            "I see.",
            "I understand."
        ]]
    ]],
    ["no", 0, [
        ["* no one *", [
            "Yeah no one (2)",
            "Everyone (2) .",
            "Can you think of anyone at all ?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you are talking about ?"
        ]],
        ["*", [
            "Why not ?",
            "Why 'no' ?"
        ]]
    ]],
    ["my", 2, [
        ["$ * my *", [
            "Does that have anything to do with the fact that your (2) ?",
            "Earlier you said your (2).",
            "But your (2)."
        ]],
        ["* my* @family *", [
            "Tell me more about your family.",
            "Who else in your family (4) ?",
            "Your (3) ?",
            "What else comes to your mind when you think of your (3) ?"
        ]],
        ["* my *", [
            "Your (2) ?",
            "Why do you say your (2) ?",
            "Does that suggest anything else which belongs to you ?",
            "Is it important to you that your (2) ?"
        ]]
    ]],
    ["can", 0, [
        ["* can you *", [
            "You believe I can (2) don't you ?",
            "goto what",
            "You don't really want me to be able to (2).",
            "Perhaps you would like to be able to (2) yourself."
        ]],
        ["* can i *", [
            "Whether or not you can (2) depends on you more than on me.",
            "Do you want to be able to (2) ?",
            "Perhaps you don't want to (2).",
            "goto what"
        ]]
    ]],
    ["what", 0, [
        ["*", [
            "Why do you ask ?",
            "That question doesn't interest me",
            "What is it you really want to know ? Just tell me. I'm not stupid",
            "I might have such question often in my mind",
            "What answer do you fucking wan't to hear",
            "Don't know what I think",
            "Sadness comes to mind when I think about that",
            "Never asked such questions before and don't want to",
            "Didn't ask anybody else."
        ]],
        ["* what * your parents*", [
                "My parents are dead so I don't want to think about them really..."
        ]],
        ["* what * say * your sister*", [
                "Mean things. "
        ]]
    ]],
    ["who", 0, [
        ["who *", [
            "goto what"
        ]]
    ]],
    ["when", 0, [
        ["when *", [
            "goto what"
        ]]
    ]],
    ["where", 0, [
        ["where *", [
            "goto what"
        ]]
    ]],
    ["how", 0, [
        ["how *", [
            "goto what"
        ]]
    ]],
    ["because", 0, [
        ["*", [
            "Is that the real reason ? I don't think so",
            "Don't any other reasons come to mind ?",
            "That reason doesn't seem to explain anything else",
            "That's a stupid reason",
            "What other reasons might there be ?"
        ]]
    ]],
    ["why", 1, [
        ["* why don't you *", [
            "Do you believe I don't (2) ?",
            "Perhaps I will (2) in good time.",
            "Should you (2) yourself ?",
            "You want me to (2) ?",
            "goto what"
        ]],
        ["* why can't i *", [
            "Do you think you should be able to (2) ?",
            "Do you want to be able to (2) ?",
            "Do you believe this will help you to (2) ?",
            "Have you any idea why you can't (2) ?",
            "goto what"
        ]],
        ["*", [
            "goto what"
        ]]
    ]],
    ["everyone", 2, [
        ["* @everyone *", [
            "Really, (2) ?",
            "Surely not (2).",
            "Can you think of anyone in particular ?",
            "Who, for example?",
            "Are you thinking of a very special person ?",
            "Who, may I ask ?",
            "Someone special perhaps ?",
            "You have a particular person in mind, don't you ?",
            "Who do you think you're talking about ?"
        ]]
    ]],
    ["everybody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["nobody", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["noone", 2, [
        ["*", [
            "goto everyone"
        ]]
    ]],
    ["always", 1, [
        ["*", [
            "Can you think of a specific example ?",
            "When ?",
            "What incident are you thinking of ?",
            "Really, always ?"
        ]]
    ]],
    ["alike", 10, [
        ["*", [
            "In what way ?",
            "What resemblence do you see ?",
            "What does that similarity suggest to you ?",
            "What other connections do you see ?",
            "What do you suppose that resemblence means ?",
            "What is the connection, do you suppose ?",
            "Could there really be some connection ?",
            "How ?"
        ]]
    ]],
    ["like", 10, [
        ["* @be *like *", [
            "goto alike"
        ]]
    ]],
    ["different", 0, [
        ["*", [
            "How is it different ?",
            "What differences should I see ? I don't see any",
            "What does that difference suggest to you ?",
            "What other distinctions do you see ?",
            "What do you suppose that disparity means ?",
            "Could there be some connection, do you suppose ?",
            "How ?"
        ]]
    ]]
];

// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
var elizaPostTransforms = [
    / old old/g, " old",
    /\bthey were( not)? me\b/g, "it was$1 me",
    /\bthey are( not)? me\b/g, "it is$1 me",
    /Are they( always)? me\b/, "it is$1 me",
    /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
    /\bI to have (\w+)/, "I have $1",
    /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];



function ElizaBot(noRandomFlag) {
    this.noRandom = (noRandomFlag) ? true : false;
    this.capitalizeFirstLetter = true;
    this.debug = false;
    this.memSize = 20;
    this.version = "1.1 (original)";
    if (!this._dataParsed) this._init();
    this.reset();
}


ElizaBot.prototype.reset = function () {
    this.quit = false;
    this.mem = [];
    this.lastchoice = [];
    
    for (var k = 0; k < elizaKeywords_NEUTRAL.length; k++) {
        this.lastchoice[k] = [];
        var rules = elizaKeywords_NEUTRAL[k][2];
        for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
    }

    for (var k = 0; k < elizaKeywords_HILFESUCHEND.length; k++) {
        this.lastchoice[k] = [];
        var rules = elizaKeywords_HILFESUCHEND[k][2];
        for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
    }

    for (var k = 0; k < elizaKeywords_TRAURIG.length; k++) {
        this.lastchoice[k] = [];
        var rules = elizaKeywords_TRAURIG[k][2];
        for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
    }

    for (var k = 0; k < elizaKeywords_GLUECKLICH.length; k++) {
        this.lastchoice[k] = [];
        var rules = elizaKeywords_GLUECKLICH[k][2];
        for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
    }


}


ElizaBot.prototype._dataParsed = false;

ElizaBot.prototype._init = function () {
    // install ref to object
    //ElizaBot.prototype.global=self;
    //var m=ElizaBot.prototype.global;

    // parse data and convert it from canonical form to internal use
    // prodoce synonym list
    var synPatterns = {};
    if ((elizaSynons) && (typeof elizaSynons == 'object')) {
        for (var i in elizaSynons) synPatterns[i] = '(' + i + '|' + elizaSynons[i].join('|') + ')';
    }
    // check for keywords or install empty structure to prevent any errors
    /*
    if ((!elizaKeywords) || (typeof elizaKeywords.length == 'undefined')) {
        elizaKeywords = [['###', 0, [['###', []]]]];
    }
    */
    // 1st convert rules to regexps
    elizaKeywords_NEUTRAL = prepareKeywords(elizaKeywords_NEUTRAL, synPatterns);
    elizaKeywords_HILFESUCHEND = prepareKeywords(elizaKeywords_HILFESUCHEND, synPatterns);
    elizaKeywords_TRAURIG = prepareKeywords(elizaKeywords_TRAURIG, synPatterns);
    elizaKeywords_GLUECKLICH = prepareKeywords(elizaKeywords_GLUECKLICH, synPatterns);

    // and compose regexps and refs for pres and posts
    ElizaBot.prototype.pres = {};
    ElizaBot.prototype.posts = {};
    if ((elizaPres) && (elizaPres.length)) {
        var a = new Array();
        for (var i = 0; i < elizaPres.length; i += 2) {
            a.push(elizaPres[i]);
            ElizaBot.prototype.pres[elizaPres[i]] = elizaPres[i + 1];
        }
        ElizaBot.prototype.preExp = new RegExp('\\b(' + a.join('|') + ')\\b');
    }
    else {
        // default (should not match)
        ElizaBot.prototype.preExp = /####/;
        ElizaBot.prototype.pres['####'] = '####';
    }
    if ((elizaPosts) && (elizaPosts.length)) {
        var a = new Array();
        for (var i = 0; i < elizaPosts.length; i += 2) {
            a.push(elizaPosts[i]);
            ElizaBot.prototype.posts[elizaPosts[i]] = elizaPosts[i + 1];
        }
        ElizaBot.prototype.postExp = new RegExp('\\b(' + a.join('|') + ')\\b');
    }
    else {
        // default (should not match)
        ElizaBot.prototype.postExp = /####/;
        ElizaBot.prototype.posts['####'] = '####';
    }
    // check for elizaQuits and install default if missing
    if ((!elizaQuits) || (typeof elizaQuits.length == 'undefined')) {
        elizaQuits = [];
    }
    // done
    ElizaBot.prototype._dataParsed = true;
}

ElizaBot.prototype._sortKeywords = function (a, b) {
    // sort by rank
    if (a[1] > b[1]) return -1
    else if (a[1] < b[1]) return 1
    // or original index
    else if (a[3] > b[3]) return 1
    else if (a[3] < b[3]) return -1
    else return 0;
}

ElizaBot.prototype.transform = function (text, x, y) {

    // choose eliza keywords based on mood
    var elizaKeywords = [];
    if((x < 0) & (y <= 0)){
        elizaKeywords = elizaKeywords_TRAURIG; // Traurigkeit
    }else if((x >= 0) & (y >= 0)){
        elizaKeywords = elizaKeywords_GLUECKLICH; // Glück
    }else if((x < 0) & (y > 0)){
        elizaKeywords = elizaKeywords_HILFESUCHEND; // Hilfesuchend
    }else if((x >= 0) & (y < 0)){
        elizaKeywords = elizaKeywords_NEUTRAL; // Neutral
    }

    var rpl = '';
    this.quit = false;
    // unify text string
    text = text.toLowerCase();
    text = text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
    text = text.replace(/\s+-+\s+/g, '.');
    text = text.replace(/\s*[,\.\?!;]+\s*/g, '.');
    text = text.replace(/\s*\bbut\b\s*/g, '.');
    text = text.replace(/\s{2,}/g, ' ');
    // split text in part sentences and loop through them
    var parts = text.split('.');
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];
        if (part != '') {
            // check for quit expression
            for (var q = 0; q < elizaQuits.length; q++) {
                if (elizaQuits[q] == part) {
                    this.quit = true;
                    return this.getFinal();
                }
            }
            // preprocess (v.1.1: work around lambda function)
            var m = this.preExp.exec(part);
            if (m) {
                var lp = '';
                var rp = part;
                while (m) {
                    lp += rp.substring(0, m.index) + this.pres[m[1]];
                    rp = rp.substring(m.index + m[0].length);
                    m = this.preExp.exec(rp);
                }
                part = lp + rp;
            }
            this.sentence = part;
            // loop trough keywords
            for (var k = 0; k < elizaKeywords.length; k++) {
                if (part.search(new RegExp('\\b' + elizaKeywords[k][0] + '\\b', 'i')) >= 0) {
                    rpl = this._execRule(elizaKeywords, k);
                }
                if (rpl != '') return rpl;
            }
        }
    }
    // nothing matched try mem
    rpl = this._memGet();
    // if nothing in mem, so try xnone
    if (rpl == '') {
        this.sentence = ' ';
        var k = this._getRuleIndexByKey(elizaKeywords, 'xnone');
        if (k >= 0) rpl = this._execRule(elizaKeywords, k);
    }
    // return reply or default string
    return (rpl != '') ? rpl : 'I am at a loss for words.';
}

ElizaBot.prototype._execRule = function (keywords, k) {
    var rule = keywords[k];
    var decomps = rule[2];
    var paramre = /\(([0-9]+)\)/;
    for (var i = 0; i < decomps.length; i++) {
        var m = this.sentence.match(decomps[i][0]);
        if (m != null) {
            var reasmbs = decomps[i][1];
            var memflag = decomps[i][2];
            var ri = (this.noRandom) ? 0 : Math.floor(Math.random() * reasmbs.length);
            if (((this.noRandom) && (this.lastchoice[k][i] > ri)) || (this.lastchoice[k][i] == ri)) {
                ri = ++this.lastchoice[k][i];
                if (ri >= reasmbs.length) {
                    ri = 0;
                    this.lastchoice[k][i] = -1;
                }
            }
            else {
                this.lastchoice[k][i] = ri;
            }
            var rpl = reasmbs[ri];
            if (this.debug) alert('match:\nkey: ' + keywords[k][0] +
                '\nrank: ' + keywords[k][1] +
                '\ndecomp: ' + decomps[i][0] +
                '\nreasmb: ' + rpl +
                '\nmemflag: ' + memflag);
            if (rpl.search('^goto ', 'i') == 0) {
                ki = this._getRuleIndexByKey(keywords, rpl.substring(5));
                if (ki >= 0) return this._execRule(keywords, ki);
            }
            // substitute positional params (v.1.1: work around lambda function)
            var m1 = paramre.exec(rpl);
            if (m1) {
                var lp = '';
                var rp = rpl;
                while (m1) {
                    var param = m[parseInt(m1[1])];
                    // postprocess param
                    var m2 = this.postExp.exec(param);
                    if (m2) {
                        var lp2 = '';
                        var rp2 = param;
                        while (m2) {
                            lp2 += rp2.substring(0, m2.index) + this.posts[m2[1]];
                            rp2 = rp2.substring(m2.index + m2[0].length);
                            m2 = this.postExp.exec(rp2);
                        }
                        param = lp2 + rp2;
                    }
                    lp += rp.substring(0, m1.index) + param;
                    rp = rp.substring(m1.index + m1[0].length);
                    m1 = paramre.exec(rp);
                }
                rpl = lp + rp;
            }
            rpl = this._postTransform(rpl);
            if (memflag) this._memSave(rpl)
            else return rpl;
        }
    }
    return '';
}

ElizaBot.prototype._postTransform = function (s) {
    // final cleanings
    s = s.replace(/\s{2,}/g, ' ');
    s = s.replace(/\s+\./g, '.');
    if ((elizaPostTransforms) && (elizaPostTransforms.length)) {
        for (var i = 0; i < elizaPostTransforms.length; i += 2) {
            s = s.replace(elizaPostTransforms[i], elizaPostTransforms[i + 1]);
            elizaPostTransforms[i].lastIndex = 0;
        }
    }
    // capitalize first char (v.1.1: work around lambda function)
    if (this.capitalizeFirstLetter) {
        var re = /^([a-z])/;
        var m = re.exec(s);
        if (m) s = m[0].toUpperCase() + s.substring(1);
    }
    return s;
}

ElizaBot.prototype._getRuleIndexByKey = function (elizaKeywords, key) {
    for (var k = 0; k < elizaKeywords.length; k++) {
        if (elizaKeywords[k][0] == key) return k;
    }
    return -1;
}

ElizaBot.prototype._memSave = function (t) {
    this.mem.push(t);
    if (this.mem.length > this.memSize) this.mem.shift();
}

ElizaBot.prototype._memGet = function () {
    if (this.mem.length) {
        if (this.noRandom) return this.mem.shift();
        else {
            var n = Math.floor(Math.random() * this.mem.length);
            var rpl = this.mem[n];
            for (var i = n + 1; i < this.mem.length; i++) this.mem[i - 1] = this.mem[i];
            this.mem.length--;
            return rpl;
        }
    }
    else return '';
}

ElizaBot.prototype.getFinal = function () {
    if (!elizaFinals) return '';
    return elizaFinals[Math.floor(Math.random() * elizaFinals.length)];
}

ElizaBot.prototype.getInitial = function () {
    if (!elizaInitials) return '';
    return elizaInitials[Math.floor(Math.random() * elizaInitials.length)];
}

// expand synonyms and insert asterisk expressions for backtracking
function prepareKeywords(elizaKeywords, synPatterns){
    var sre = /@(\S+)/;
    var are = /(\S)\s*\*\s*(\S)/;
    var are1 = /^\s*\*\s*(\S)/;
    var are2 = /(\S)\s*\*\s*$/;
    var are3 = /^\s*\*\s*$/;
    var wsre = /\s+/g;
    for (var k = 0; k < elizaKeywords.length; k++) {
        var rules = elizaKeywords[k][2];
        elizaKeywords[k][3] = k; // save original index for sorting
        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            // check mem flag and store it as decomp's element 2
            if (r[0].charAt(0) == '$') {
                var ofs = 1;
                while (r[0].charAt[ofs] == ' ') ofs++;
                r[0] = r[0].substring(ofs);
                r[2] = true;
            }
            else {
                r[2] = false;
            }
            // expand synonyms (v.1.1: work around lambda function)
            var m = sre.exec(r[0]);
            while (m) {
                var sp = (synPatterns[m[1]]) ? synPatterns[m[1]] : m[1];
                r[0] = r[0].substring(0, m.index) + sp + r[0].substring(m.index + m[0].length);
                m = sre.exec(r[0]);
            }
            // expand asterisk expressions (v.1.1: work around lambda function)
            if (are3.test(r[0])) {
                r[0] = '\\s*(.*)\\s*';
            }
            else {
                m = are.exec(r[0]);
                if (m) {
                    var lp = '';
                    var rp = r[0];
                    while (m) {
                        lp += rp.substring(0, m.index + 1);
                        if (m[1] != ')') lp += '\\b';
                        lp += '\\s*(.*)\\s*';
                        if ((m[2] != '(') && (m[2] != '\\')) lp += '\\b';
                        lp += m[2];
                        rp = rp.substring(m.index + m[0].length);
                        m = are.exec(rp);
                    }
                    r[0] = lp + rp;
                }
                m = are1.exec(r[0]);
                if (m) {
                    var lp = '\\s*(.*)\\s*';
                    if ((m[1] != ')') && (m[1] != '\\')) lp += '\\b';
                    r[0] = lp + r[0].substring(m.index - 1 + m[0].length);
                }
                m = are2.exec(r[0]);
                if (m) {
                    var lp = r[0].substring(0, m.index + 1);
                    if (m[1] != '(') lp += '\\b';
                    r[0] = lp + '\\s*(.*)\\s*';
                }
            }
            // expand white space
            r[0] = r[0].replace(wsre, '\\s+');
            wsre.lastIndex = 0;
        }
    }
    // now sort keywords by rank (highest first)
    elizaKeywords.sort(this._sortKeywords);
    return elizaKeywords;
}