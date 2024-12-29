import React, { useEffect, useRef } from "react";
import Graph from "graphology";
import { Sigma } from "sigma";
import { parse } from "graphology-gexf/browser";


const GraphComponent = () => {
  const containerRef = useRef(null);
  const zoomInBtnRef = useRef(null);
  const zoomOutBtnRef = useRef(null);
  const zoomResetBtnRef = useRef(null);
  const labelsThresholdRangeRef = useRef(null);


  useEffect(() => {
    // Create a new graph
    const graph = new Graph();

    // Central AI node
    const centralNode = "AI";
    graph.addNode(centralNode, {
      label: "Dynamic AI Coordinator",
      size: 20,
      x: 0,
      y: 0,
      color: "#FF6347", // Tomato color for the central node
    });

    // Define subtopics and their leaf nodes
    const subtopics = [
      {
        name: "Knowledge Management",
        leaves: [
          "RAG System",
          "Vector Databases",
          "Knowledge Bases",
          "Document Search",
          "Dynamic Retrieval",
          "Ontology Mapping",
          "Memory Management",
          "Graph Databases",
          "Embedded Knowledge",
          "Context Linking",
        ],
      },
      {
        name: "Language Processing",
        leaves: [
          "Text Summarization",
          "Sentiment Analysis",
          "Language Translation",
          "Grammar Correction",
          "Text Classification",
          "Intent Recognition",
          "Text Embedding",
          "Paraphrasing",
          "Named Entity Recognition",
          "Context Extraction",
        ],
      },
      {
        name: "Decision Making",
        leaves: [
          "Multi-Criteria Analysis",
          "Reinforcement Learning",
          "Utility Maximization",
          "Monte Carlo Methods",
          "Scenario Planning",
          "Dynamic Programming",
          "Rule-Based Systems",
          "Predictive Analytics",
          "A/B Testing",
          "Optimization Algorithms",
        ],
      },
      {
        name: "Audio Processing",
        leaves: [
          "Speech-to-Text",
          "Text-to-Speech",
          "Voice Activity Detection",
          "Speaker Diarization",
          "Audio Enhancement",
          "Noise Cancellation",
          "Acoustic Modeling",
          "Music Analysis",
          "Emotion Detection in Audio",
          "Sound Source Localization",
        ],
      },
      {
        name: "User Interaction",
        leaves: [
          "Personalized Responses",
          "Contextual Prompts",
          "Gesture Recognition",
          "Multimodal Inputs",
          "Adaptive Interfaces",
          "Eye Tracking",
          "Voice Commands",
          "User Feedback Analysis",
          "Chatbot Integration",
          "Haptic Feedback",
        ],
      },
      {
        name: "Emotional Wellbeing",
        leaves: [
          "Stress Detection",
          "Mood Analysis",
          "Mindfulness Guidance",
          "Cognitive Behavioral Suggestions",
          "Sleep Tracking",
          "Mental Health Analysis",
          "Positive Reinforcement",
          "Emotional Recognition",
          "Behavioral Trends",
          "Motivational Coaching",
        ],
      },
      {
        name: "Time Management",
        leaves: [
          "Calendar Scheduling",
          "Task Prioritization",
          "Time Tracking",
          "Reminder Systems",
          "Productivity Insights",
          "Habit Formation",
          "Goal Tracking",
          "Pomodoro Techniques",
          "Deadline Management",
          "Focus Time Allocation",
        ],
      },
      {
        name: "Entertainment",
        leaves: [
          "Music Recommendations",
          "Movie Suggestions",
          "Game Statistics",
          "Trivia & Quizzes",
          "Social Media Insights",
          "Augmented Reality",
          "Virtual Reality",
          "Art Generation",
          "Book Suggestions",
          "Live Event Tracking",
        ],
      },
      {
        name: "Learning",
        leaves: [
          "Adaptive Learning",
          "Skill Recommendations",
          "Flashcards",
          "Quiz Generation",
          "Knowledge Gaps",
          "Study Schedule",
          "Language Learning",
          "Coding Challenges",
          "Progress Tracking",
          "Microlearning",
        ],
      },
      {
        name: "Health & Fitness",
        leaves: [
          "Step Counting",
          "Workout Plans",
          "Diet Tracking",
          "Sleep Analysis",
          "Heart Rate Monitoring",
          "Fitness Goals",
          "Calorie Tracking",
          "Water Intake",
          "Posture Alerts",
          "Meditation",
        ],
      },
    ];

    // Add subtopics and their leaf nodes
    subtopics.forEach((subtopic, index) => {
      const subNodeId = `sub-${index}`;
      graph.addNode(subNodeId, {
        label: subtopic.name,
        size: 15,
        x: Math.cos((index / subtopics.length) * 2 * Math.PI) * 50 + Math.random() * 10,
        y: Math.sin((index / subtopics.length) * 2 * Math.PI) * 50 + Math.random() * 10,
        color: "#FFA500", // Orange color for subtopics
      });
      graph.addEdge(centralNode, subNodeId);

      // Add leaf nodes
      subtopic.leaves.forEach((leaf, leafIndex) => {
        const leafNodeId = `sub-${index}-leaf-${leafIndex}`;
        graph.addNode(leafNodeId, {
          label: leaf,
          size: 10,
          x:
            Math.cos((leafIndex / 10) * 2 * Math.PI) * 20 +
            Math.cos((index / subtopics.length) * 2 * Math.PI) * 50,
          y:
            Math.sin((leafIndex / 10) * 2 * Math.PI) * 20 +
            Math.sin((index / subtopics.length) * 2 * Math.PI) * 50,
          color: "#ADD8E6", // Light blue color for leaf nodes
        });
        graph.addEdge(subNodeId, leafNodeId);
      });
    });

    // Initialize Sigma renderer
    const renderer = new Sigma(graph, containerRef.current, {
      renderLabels: true,
    });

    renderer.on('clickNode', (event) => {
      const nodeId = event.node;
      const node = graph.getNodeAttributes(nodeId);
      console.log(node);
      // Center the camera on the clicked node
    });

    const camera = renderer.getCamera();

    const zoomInBtn = zoomInBtnRef.current;
    const zoomOutBtn = zoomOutBtnRef.current;
    const zoomResetBtn = zoomResetBtnRef.current;
    const labelsThresholdRange = labelsThresholdRangeRef.current;

    // Bind zoom manipulation buttons
    zoomInBtn.addEventListener("click", () => {
      camera.animatedZoom({ duration: 600 });
    });
    zoomOutBtn.addEventListener("click", () => {
      camera.animatedUnzoom({ duration: 600 });
    });
    zoomResetBtn.addEventListener("click", () => {
      camera.animatedReset({ duration: 600 });
    });

    // Bind labels threshold to range input
    labelsThresholdRange.addEventListener("input", () => {
      renderer.setSetting("labelRenderedSizeThreshold", +labelsThresholdRange.value);
    });

    // Set proper range initial value:
    labelsThresholdRange.value = renderer.getSetting("labelRenderedSizeThreshold") + "";

    return () => {
      renderer.kill(); // Clean up Sigma instance on unmount
    };


  }, []);

  return (
    <>
    <div id="controls">
        <div ref={zoomInBtnRef}  className="input"><label for="zoom-in">Zoom in</label><button id="zoom-in">+</button></div>
        <div ref={zoomOutBtnRef} className="input"><label for="zoom-out">Zoom out</label><button id="zoom-out">-</button></div>
        <div ref={zoomResetBtnRef} className="input"><label for="zoom-reset">Reset zoom</label><button id="zoom-reset">⊙</button></div>
        <div className="input">
          <label for="labels-threshold">Labels threshold</label>
          <input  ref={labelsThresholdRangeRef} id="labels-threshold" type="range" min="0" max="15" step="0.5" />
        </div>
        </div>
    <div
      className="graph-container"
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        border: "1px solid #ccc",
      }}
    ></div>
    </>
  );
};

export default GraphComponent;
