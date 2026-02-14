import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AuthGate } from "@/components/auth-gate";

export const Route = createFileRoute("/")({
  component: () => (
    <AuthGate>
      <ValentinesAdventure />
    </AuthGate>
  ),
});

type Phase = "login" | "flashlight" | "slideshow" | "matching" | "ending";

type MatchCard = {
  id: number;
  kind: "pair";
  pairId: number;
  text: string;
};

type TrickCard = {
  id: number;
  kind: "trick";
  text: string;
};

type GameCard = MatchCard | TrickCard;

type Slide = {
  id: number;
  title: string;
  body: string;
  hint: string;
};

const LOGIN_ANSWER_USERNAME = "mcdonalds";
const LOGIN_ANSWER_PASSWORD = "minecraft";

const FLASHLIGHT_PHOTOS = [
  { id: 1, src: "/ourpics/IMG_7F7CFAFC-1E3A-4AAD-8E6D-EEA9A382406F.jpg", alt: "Photo 1" },
  { id: 2, src: "/ourpics/IMG_7487.jpg", alt: "Photo 2" },
  { id: 3, src: "/ourpics/IMG_6604.jpg", alt: "Photo 3" },
  { id: 4, src: "/ourpics/IMG_0131.jpg", alt: "Photo 4" },
  { id: 5, src: "/ourpics/IMG_0552.jpg", alt: "Photo 5" },
  { id: 6, src: "/ourpics/IMG_1684.JPG", alt: "Photo 6" },
  { id: 7, src: "/ourpics/Screenshot_2016-04-06-00-00-48.png", alt: "Photo 7" },
];

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "",
    body: "Loving you isnt something that i ever will be able to turn off. There is a spot for you etched into me, and i wouldn't trade it for the world. I'm honored to spend my moments and another valentines with you.",
    hint: "",
  },
  {
    id: 2,
    title: "",
    body: "The thing i love most about you is your smile. Anytime i see it, it makes me feel like things are going to be okay. The second is that you want to spend this life with me too. Thank you for choosing me as your person.",
    hint: "",
  },
  {
    id: 3,
    title: "",
    body: "I know we might not have all the time and money to have a great valentines day, but i will love to go somewhere with you tomorrow and eat a good meal. Come home, smoke, game, and cuddle till we fall asleep. The cycle of wake up work sleep feels a lot better knowing i can hold on to till i wake up.",
    hint: "",
  },
];

const PAIR_SAYINGS = [
  "I love you",
  "Your beautiful",
  "Be mine",
  "Be my valentines",
  "Kiss me",
  "Cuddle me",
  "My baby",
  "Soulmate",
  "Hold me",
  "Cutie",
  "I want you",
  "Forever",
  "Our life",
];

const TRICK_HEARTS = [
  "Candace",
];

const SLIDE_TRANSITIONS = [
  "slide-wobble",
  "slide-spin",
  "slide-bounce",
  "slide-glitch",
];

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase();
}

function shuffle<T>(items: T[]): T[] {
  const cloned = [...items];
  for (let index = cloned.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentItem = cloned[index];
    const randomItem = cloned[randomIndex];

    cloned[index] = randomItem;
    cloned[randomIndex] = currentItem;
  }
  return cloned;
}

function createDeck(): GameCard[] {
  let id = 1;
  const pairCards = PAIR_SAYINGS.flatMap((saying, pairId) => {
    const firstCard: MatchCard = {
      id,
      kind: "pair",
      pairId,
      text: saying,
    };
    id += 1;

    const secondCard: MatchCard = {
      id,
      kind: "pair",
      pairId,
      text: saying,
    };
    id += 1;

    return [firstCard, secondCard];
  });

  const trickCards: TrickCard[] = TRICK_HEARTS.map((text) => {
    const trickCard: TrickCard = {
      id,
      kind: "trick",
      text,
    };
    id += 1;
    return trickCard;
  });

  return shuffle([...pairCards, ...trickCards]);
}

function ValentinesAdventure() {
  const [phase, setPhase] = useState<Phase>("flashlight");

  const [firstDateValue, setFirstDateValue] = useState("");
  const [firstGameValue, setFirstGameValue] = useState("");
  const [loginChecked, setLoginChecked] = useState(false);
  const [loginPassed, setLoginPassed] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const [flashlightX, setFlashlightX] = useState(50);
  const [flashlightY, setFlashlightY] = useState(50);
  const [lightsOn, setLightsOn] = useState(false);
  const [switchPosition, setSwitchPosition] = useState({ top: 20, left: 85 });

  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesCompleted, setSlidesCompleted] = useState(false);

  const [deck, setDeck] = useState<GameCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<number[]>([]);
  const [matchedCardIds, setMatchedCardIds] = useState<number[]>([]);
  const [lives, setLives] = useState(3);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [matchingNextVisible, setMatchingNextVisible] = useState(false);
  const [matchingNextPresses, setMatchingNextPresses] = useState(0);
  const [matchingNudge, setMatchingNudge] = useState("");
  const [isPreviewPhase, setIsPreviewPhase] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("valentines-session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.phase && ["login", "flashlight", "slideshow", "matching", "ending"].includes(parsed.phase)) {
          setPhase(parsed.phase);
          if (parsed.lightsOn !== undefined) setLightsOn(parsed.lightsOn);
          if (parsed.slideIndex !== undefined) setSlideIndex(parsed.slideIndex);
          if (parsed.slidesCompleted !== undefined) setSlidesCompleted(parsed.slidesCompleted);
          if (parsed.loginPassed !== undefined) setLoginPassed(parsed.loginPassed);
          if (parsed.loginChecked !== undefined) setLoginChecked(parsed.loginChecked);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    const sessionData = {
      phase,
      lightsOn: phase === "flashlight" || phase === "slideshow" || phase === "matching" || phase === "ending" ? lightsOn : false,
      slideIndex: phase === "slideshow" || phase === "matching" || phase === "ending" ? slideIndex : 0,
      slidesCompleted: phase === "slideshow" || phase === "matching" || phase === "ending" ? slidesCompleted : false,
      loginPassed: phase !== "login" ? loginPassed : false,
      loginChecked: phase !== "login" ? loginChecked : false,
    };
    localStorage.setItem("valentines-session", JSON.stringify(sessionData));
  }, [phase, lightsOn, slideIndex, slidesCompleted, loginPassed, loginChecked]);

  useEffect(() => {
    if (phase !== "slideshow") {
      return;
    }

    setSlideIndex(0);
    setSlidesCompleted(false);
  }, [phase]);

  useEffect(() => {
    if (phase === "flashlight" && !lightsOn) {
      const randomTop = Math.floor(Math.random() * 60) + 15;
      const randomLeft = Math.floor(Math.random() * 50) + 25;
      setSwitchPosition({ top: randomTop, left: randomLeft });
    }
  }, [phase, lightsOn]);

  useEffect(() => {
    if (phase !== "matching") {
      return;
    }

    const newDeck = createDeck();
    setDeck(newDeck);
    setMatchedCardIds([]);
    setLives(3);
    setIsBoardLocked(true);
    setMatchingNextVisible(false);
    setMatchingNextPresses(0);
    setMatchingNudge("");
    
    // Show all cards for 1 second preview
    setIsPreviewPhase(true);
    const allCardIds = newDeck.map(card => card.id);
    setFlippedCardIds(allCardIds);
    
    const previewTimer = window.setTimeout(() => {
      setFlippedCardIds([]);
      setIsPreviewPhase(false);
      setIsBoardLocked(false);
    }, 1000);

    const nextTimer = window.setTimeout(() => {
      setMatchingNextVisible(true);
    }, 30000);

    return () => {
      window.clearTimeout(previewTimer);
      window.clearTimeout(nextTimer);
    };
  }, [phase]);

  const handleNextSlide = () => {
    if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlidesCompleted(true);
    }
  };

  const currentSlide = SLIDES[slideIndex];
  const transitionClass = SLIDE_TRANSITIONS[slideIndex % SLIDE_TRANSITIONS.length];

  const pairCardCount = useMemo(
    () => deck.reduce((count, card) => count + (card.kind === "pair" ? 1 : 0), 0),
    [deck],
  );

  const pairMatchesComplete = matchedCardIds.length >= pairCardCount && pairCardCount > 0;

  const spotlightStyle = {
    background: lightsOn
      ? "transparent"
      : `radial-gradient(circle 220px at ${flashlightX}% ${flashlightY}%, transparent 0%, rgba(0, 0, 0, 0.03) 15%, rgba(0, 0, 0, 0.15) 30%, black 60%)`,
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginChecked(true);

    const usernameCorrect = normalizeAnswer(firstDateValue) === LOGIN_ANSWER_USERNAME;
    const passwordCorrect = normalizeAnswer(firstGameValue) === LOGIN_ANSWER_PASSWORD;
    
    if (!usernameCorrect || !passwordCorrect) {
      setLoginAttempts((prev) => prev + 1);
    }
    
    setLoginPassed(usernameCorrect && passwordCorrect);
  };

  const handleFlashlightMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const offsetY = ((event.clientY - bounds.top) / bounds.height) * 100;
    setFlashlightX(Math.max(0, Math.min(100, offsetX)));
    setFlashlightY(Math.max(0, Math.min(100, offsetY)));
  };

  const isPhotoNearCursor = (photoId: number) => {
    const photoPositions: Record<number, { top: number; left: number }> = {
      1: { top: 3, left: 5 },
      2: { top: 5, left: 35 },
      3: { top: 2, left: 75 },
      4: { top: 35, left: 3 },
      5: { top: 38, left: 38 },
      6: { top: 32, left: 80 },
      7: { top: 68, left: 15 },
    };
    const pos = photoPositions[photoId];
    if (!pos) return false;
    const distance = Math.sqrt(Math.pow(flashlightX - pos.left, 2) + Math.pow(flashlightY - pos.top, 2));
    return distance < 20;
  };

  const handleCardClick = (cardId: number) => {
    if (isBoardLocked) {
      return;
    }

    if (matchedCardIds.includes(cardId) || flippedCardIds.includes(cardId)) {
      return;
    }

    if (flippedCardIds.length >= 2) {
      return;
    }

    const card = deck.find((c) => c.id === cardId);
    
    // If it's a trick card, keep it flipped forever (no pair needed)
    if (card?.kind === "trick") {
      setMatchedCardIds((current) => [...current, cardId]);
      return;
    }

    const nextFlippedIds = [...flippedCardIds, cardId];
    setFlippedCardIds(nextFlippedIds);

    if (nextFlippedIds.length < 2) {
      return;
    }

    const firstCard = deck.find((card) => card.id === nextFlippedIds[0]);
    const secondCard = deck.find((card) => card.id === nextFlippedIds[1]);

    if (!firstCard || !secondCard) {
      setFlippedCardIds([]);
      return;
    }

    const isPairMatch =
      firstCard.kind === "pair" &&
      secondCard.kind === "pair" &&
      firstCard.pairId === secondCard.pairId;

    setIsBoardLocked(true);

    window.setTimeout(() => {
      if (isPairMatch) {
        setMatchedCardIds((currentMatches) => [...currentMatches, firstCard.id, secondCard.id]);
      } else {
        setLives((currentLives) => currentLives - 1);
      }

      setFlippedCardIds([]);
      setIsBoardLocked(false);
    }, 700);
  };

  const renderPhase = () => {
    if (phase === "login") {
      return (
        <section className="phase-shell phase-login">
          <div className="aurora-orb aurora-orb-1" aria-hidden="true" />
          <div className="aurora-orb aurora-orb-2" aria-hidden="true" />
          <div className="aurora-orb aurora-orb-3" aria-hidden="true" />
          <div className="login-card">
            <h1>Sign-in <span className="heart-symbol">❤</span></h1>
            <p className="helper-copy">answer these 2 questions to start</p>

            <form className="login-form" onSubmit={handleLoginSubmit}>
              <label>
                First date?
                <input
                  value={firstDateValue}
                  onChange={(event) => setFirstDateValue(event.target.value)}
                  placeholder="[Type answer here]"
                  autoComplete="off"
                />
              </label>

              <label>
                First game together?
                <input
                  value={firstGameValue}
                  onChange={(event) => setFirstGameValue(event.target.value)}
                  placeholder="[Type answer here]"
                  autoComplete="off"
                />
              </label>

              <button type="submit" className="glow-button">
                start
              </button>
            </form>

            {loginChecked && !loginPassed ? (
              <p className="error-copy">
                {loginAttempts >= 2 
                  ? "Hint: McDonald's + Minecraft" 
                  : "Almost! Try again."}
              </p>
            ) : null}

            {loginPassed ? (
              <div className="login-success-area">
                <div className="sparkle-container" aria-hidden="true">
                  <span className="sparkle-float">♥</span>
                  <span className="sparkle-float">♥</span>
                  <span className="sparkle-float">♥</span>
                  <span className="sparkle-float">♥</span>
                  <span className="sparkle-float">♥</span>
                  <span className="sparkle-float">♥</span>
                </div>
                <p className="success-copy">♥ Correct. You unlocked the heart vault. ♥</p>
                <button type="button" className="glow-button" onClick={() => setPhase("flashlight")}>
                  Continue
                </button>
              </div>
            ) : null}
          </div>
        </section>
      );
    }

    if (phase === "flashlight") {
      return (
        <section className={`phase-shell phase-flashlight ${lightsOn ? "lights-on" : ""}`} onMouseMove={lightsOn ? undefined : handleFlashlightMove}>
          <div className="galaxy-canvas" aria-hidden="true">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="galaxy-star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <header className="phase-header-inline">
            <h2>Lightbulb or Memory?</h2>
            <p>It's dark... find the lightbulb</p>
          </header>

          <div className="photo-scatter-wrap">
            {FLASHLIGHT_PHOTOS.map((photo) => (
              <article 
                key={photo.id} 
                className={`photo-memory photo-pos-${photo.id} ${lightsOn || isPhotoNearCursor(photo.id) ? "revealed" : ""}`}
              >
                <div className="photo-frame">
                  <img src={photo.src} alt={photo.alt} />
                </div>
              </article>
            ))}

            <button
              type="button"
              className="light-switch"
              style={{ top: `${switchPosition.top}%`, left: `${switchPosition.left}%` }}
              onClick={() => setLightsOn(true)}
              aria-label="Turn on the lights"
            >
              <span className="lightbulb">💡</span>
              <span className="switch-tip">Lightbulb</span>
            </button>
          </div>

          <div className="spotlight-overlay" style={spotlightStyle} />

          {!lightsOn ? <div className="flashlight-cursor" style={{ left: `${flashlightX}%`, top: `${flashlightY}%` }} /> : null}

          {lightsOn ? (
            <div className="phase-controls">
              <p>Here are a couple of pictures of us. I love you and hope for many more ♥</p>
              <button type="button" className="glow-button" onClick={() => setPhase("slideshow")}>
                next
              </button>
            </div>
          ) : null}
        </section>
      );
    }

    if (phase === "slideshow") {
      return (
        <section className="phase-shell phase-slideshow">
          <div className="slide-stage">
            <article key={currentSlide.id} className={`slide-card ${transitionClass}`}>
              <div className="slide-card-border">
                <p>{currentSlide.body}</p>
                <span className="slide-counter">{slideIndex + 1} / {SLIDES.length}</span>
              </div>
            </article>
          </div>

          {!slidesCompleted ? (
            <div className="phase-controls">
              <button type="button" className="glow-button" onClick={handleNextSlide}>
                {slideIndex < SLIDES.length - 1 ? "next" : "Finish"}
              </button>
            </div>
          ) : (
            <div className="phase-controls">
              <p>Okay okay, now for a little game... can you match the hearts? ♥</p>
              <button type="button" className="glow-button" onClick={() => setPhase("matching")}>
                Let's Play
              </button>
            </div>
          )}
        </section>
      );
    }

    if (phase === "matching") {
      return (
        <section className="phase-shell phase-matching">
          <header className="phase-header-inline">
            <h2>Match The Hearts</h2>
            <p>Find all the matching pairs! Some hearts might trick you... (evil laugh)</p>
            <div className="lives-container">
              <div className="lives-row" aria-label={`Lives left: ${lives}`}>
                <span className="lives-label">Lives:</span>
                {Array.from({ length: 3 }).map((_, index) => (
                  <span key={`life-heart-${index}`} className={index < Math.max(lives, 0) ? "heart-live" : "heart-lost"}>
                    ♥
                  </span>
                ))}
                <span className="lives-counter">counter = {lives}</span>
              </div>
              <p className="lives-joke">This counter is dramatic and can go below zero. We are not stopping it.</p>
            </div>
          </header>

          <div className="matching-grid">
            {deck.map((card) => {
              const isFlipped = flippedCardIds.includes(card.id) || matchedCardIds.includes(card.id);
              const cardStatusClass = matchedCardIds.includes(card.id) ? "is-matched" : "";

              return (
                <button
                  type="button"
                  key={card.id}
                  className={`heart-card ${isFlipped ? "is-flipped" : ""} ${cardStatusClass}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <span className="heart-card-inner">
                    <span className="heart-card-face heart-card-front">♥</span>
                    <span className={`heart-card-face heart-card-back ${card.kind === "trick" ? "heart-trick" : "heart-pair"}`}>
                      {card.text}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {pairMatchesComplete ? <p className="success-copy">You matched all real pairs! Definitely getting extra kisses for this ♥</p> : null}

          {matchingNextVisible ? (
            <div className="phase-controls bottom-controls">
              <button
                type="button"
                className="glow-button"
                onClick={() => {
                  if (matchingNextPresses === 0) {
                    setMatchingNextPresses(1);
                    setMatchingNudge("cmon complete it");
                    return;
                  }

                  setPhase("ending");
                }}
              >
                Continue
              </button>
              {matchingNudge ? <p className="nudge-copy">{matchingNudge}</p> : null}
            </div>
          ) : null}
        </section>
      );
    }

    return (
      <section className="phase-shell phase-ending">
        <div className="ending-card">
          <p>♥ I Love you so much and ill be here to give you a big hug and kisses before and after everytime you work. I want to keep spending evey hour of my life with you. You make me laugh, your beautiful, you pretend to laugh at my jokes, and you want to be with and around me everyday.</p>
          <p>I want to spend this valentines day and many more with you. Thank you for being in a relationship with me destanie. Thank you for choosing me. Thank you for being my valentine another year ♥</p>
          <h2>Will You Be My Valentine?</h2>
        </div>
      </section>
    );
  };

  return <main className="valentines-root">{renderPhase()}</main>;
}
