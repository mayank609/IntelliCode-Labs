require('dotenv').config()
const { connect } = require('./db')
const BlogPost  = require('./models/BlogPost')
const CaseStudy = require('./models/CaseStudy')
const Service   = require('./models/Service')
const Product   = require('./models/Product')
const Industry  = require('./models/Industry')

const blogs = [
  { title: 'Why Prior Authorization Is the Next Frontier for Agentic AI', category: 'Healthcare', date: 'May 12, 2026', author: 'Arjun Kapoor', desc: 'A deep dive into how we reduced prior-auth review time by 74% using a multi-agent orchestration framework.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', order: 0 },
  { title: 'Sub-200ms Latency: The Voice AI Engineering Challenge', category: 'Engineering', date: 'April 28, 2026', author: 'Derek Kumar', desc: 'How we optimized our STT and LLM pipelines to achieve near-human response times in contact center deployments.', image: 'https://images.unsplash.com/photo-1589254065675-d0584d82967f?auto=format&fit=crop&w=800&q=80', order: 1 },
  { title: 'PromptOps: Bringing Software Engineering Rigor to AI Prompts', category: 'Product', date: 'April 15, 2026', author: 'Sana Rahman', desc: 'Stop using spreadsheets for prompt management. Why version control and A/B testing are essential for production AI.', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80', order: 2 },
  { title: 'Building HIPAA-Compliant LLM Systems: A Practical Guide', category: 'Healthcare', date: 'March 31, 2026', author: 'Laura Pinto', desc: 'What it actually takes to ship AI in healthcare — BAAs, PHI handling, audit trails, and the guardrails that keep you compliant.', image: 'https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&w=800&q=80', order: 3 },
  { title: 'The True Cost of LLM Hallucinations in Production', category: 'Engineering', date: 'March 18, 2026', author: 'Marcus Chen', desc: "Hallucinations aren't just annoying — in claims adjudication or freight dispatch, they have real financial consequences. Here's how we measure and mitigate them.", image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', order: 4 },
  { title: 'From Legacy IVR to Conversational Voice AI: A Migration Playbook', category: 'Product', date: 'March 5, 2026', author: 'Derek Kumar', desc: "Replacing an IVR without disrupting 50,000 daily calls is hard. Here's the phased rollout strategy that keeps containment rates high and customer complaints low.", image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80', order: 5 },
  { title: 'AgentForge 2.0: Lessons from 50+ Agentic AI Deployments', category: 'Product', date: 'February 20, 2026', author: 'Sana Rahman', desc: "After shipping agentic AI in healthcare and logistics for two years, here's what we got wrong the first time — and how AgentForge 2.0 fixes it.", image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', order: 6 },
  { title: 'Freight Intelligence: How Predictive ETA Cuts SLA Breaches by 40%', category: 'Logistics', date: 'February 6, 2026', author: 'Marcus Chen', desc: 'Our ML model for ETA prediction — how we trained it on historical load data, how we handle exceptions, and the dispatch agent it feeds into.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', order: 7 },
]

const caseStudies = [
  { client: 'Global Health Payer', title: 'Reducing Prior Authorization Review Time by 74%', domain: 'Healthcare Insurance', metric: '74%', metricLabel: 'Faster Review', desc: 'How we implemented an agentic AI system that parses medical records, applies clinical rules, and drafts determinations for medical directors.', image: 'https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&w=800&q=80', order: 0 },
  { client: 'Fortune 500 Logistics', title: 'Automating Freight Dispatch for 10,000+ Daily Loads', domain: 'Logistics', metric: '60%', metricLabel: 'OpEx Reduction', desc: 'A custom AI dispatch agent that handles 80% of routine routing decisions, allowing human dispatchers to focus on high-value exceptions.', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', order: 1 },
  { client: 'Enterprise SaaS Co.', title: 'Replacing Legacy IVR with VoicePilot', domain: 'Contact Center', metric: '22pt', metricLabel: 'CSAT Increase', desc: 'VoicePilot replaced a rigid legacy IVR system with conversational AI, increasing containment rates and significantly improving customer satisfaction.', image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80', order: 2 },
]

const services = [
  { icon: 'testing', title: 'AI Testing & Evaluation', desc: 'Ship AI that works in the real world. Our evaluation frameworks catch hallucinations, regressions, and adversarial failures before they reach production.', bullets: ['Adversarial test case generation', 'Hallucination & accuracy scoring', 'CI/CD pipeline integration', 'Production drift detection'], order: 0 },
  { icon: 'agent', title: 'Agentic AI Systems', desc: 'We design, build, and deploy multi-agent systems that complete complex, multi-step workflows autonomously — with the guardrails enterprises require.', bullets: ['Multi-agent orchestration', 'Tool use & memory management', 'Enterprise security guardrails', 'Human-in-the-loop escalation'], order: 1 },
  { icon: 'prompt', title: 'Prompt Engineering & PromptOps', desc: 'Prompts are production code. We bring software engineering discipline to prompt development — versioning, testing, optimization, and team collaboration.', bullets: ['Version-controlled prompts', 'A/B testing & evaluation', '60%+ cost reduction strategies', 'Team collaboration workflows'], order: 2 },
  { icon: 'voice', title: 'Voice AI & Contact Center', desc: 'Deploy conversational AI that handles real customer calls. We specialize in sub-200ms latency pipelines, multi-language support, and IVR replacement.', bullets: ['Sub-200ms latency pipelines', '40+ language support', 'Real-time agent assist', 'IVR modernization & replacement'], order: 3 },
]

const products = [
  { badge: 'AI Testing', title: 'TestMind Platform', tagline: 'Catch AI failures before your customers do.', desc: 'TestMind is an end-to-end AI evaluation platform that automates adversarial testing, hallucination detection, and regression monitoring for LLM-powered systems.', tags: ['LLM Evaluation', 'Regression Testing', 'Red Teaming', 'CI/CD Integration'], metric: '99.1%', metricLabel: 'Defect Detection Rate', features: ['Automated adversarial test generation', 'Hallucination & factuality scoring', 'Model version comparison', 'Production monitoring & alerts', 'CI/CD pipeline integration', 'Custom evaluation metrics'], color: 'oklch(0.48 0.14 232)', order: 0 },
  { badge: 'Agentic AI', title: 'AgentForge', tagline: 'Build production-grade multi-agent systems in weeks.', desc: 'AgentForge is a visual orchestration platform for designing, deploying, and monitoring multi-agent AI systems with enterprise-grade security and observability.', tags: ['Multi-Agent', 'Tool Use', 'Memory', 'Orchestration'], metric: '3.4×', metricLabel: 'Throughput Improvement', features: ['Drag-and-drop agent designer', 'Built-in tool use & API integration', 'Persistent memory management', 'Role-based access control', 'Human-in-the-loop escalation', 'Real-time execution monitoring'], color: 'oklch(0.52 0.12 168)', order: 1 },
  { badge: 'Prompt Engineering', title: 'PromptOps Suite', tagline: 'Treat prompts like production code.', desc: 'PromptOps brings software engineering discipline to prompt management — with version control, A/B testing, cost optimization, and team collaboration built in.', tags: ['Version Control', 'A/B Testing', 'Cost Optimization', 'Team Collab'], metric: '68%', metricLabel: 'Avg. Cost Reduction', features: ['Git-style prompt version control', 'A/B testing with evaluation scoring', 'Automated cost optimization', 'Team prompt library & review', 'Rollback & audit trail', 'Multi-model A/B comparison'], color: 'oklch(0.58 0.15 50)', order: 2 },
  { badge: 'Voice AI', title: 'VoicePilot', tagline: 'Real-time voice AI for contact centers at scale.', desc: 'VoicePilot delivers sub-200ms conversational AI for contact centers — replacing legacy IVR systems with natural language understanding and real-time agent assist.', tags: ['Real-Time STT', 'Intent Detection', 'Agent Assist', 'Call Analytics'], metric: '<200ms', metricLabel: 'Average Transcription Latency', features: ['Sub-200ms real-time transcription', '40+ language & dialect support', 'Live agent assist overlay', 'Automated call summarization', 'Intent classification & routing', 'Post-call analytics dashboard'], color: 'oklch(0.48 0.14 300)', order: 3 },
]

const industries = [
  { tag: 'Healthcare Insurance', title: 'Claims, Prior Auth & Compliance AI', desc: 'We build AI systems that navigate the complexity of healthcare insurance — from prior authorization automation to claims adjudication and compliance monitoring.', bgWord: 'HEALTH', metric: '74%', metricLabel: 'Reduction in manual review time', variant: 'dark', challenges: ['Manual prior authorization taking 5+ business days', 'High error rates in claims adjudication', 'Compliance risk from inconsistent rule application', 'Provider abrasion from slow approval cycles'], solutions: ['Agentic AI that processes prior auth in under 2 hours', 'ML models trained on claims history for accuracy', 'Automated compliance checking against current guidelines', 'Provider portal with real-time status visibility'], order: 0 },
  { tag: 'Logistics & Freight', title: 'Routing, Tracking & Dispatch Intelligence', desc: "We deploy AI that keeps freight moving — intelligent dispatch, predictive ETAs, exception management, and carrier optimization for logistics operations at scale.", bgWord: 'SHIP', metric: '60%', metricLabel: 'Reduction in operations overhead', variant: 'light', challenges: ['Dispatch decisions requiring constant human attention', 'SLA breaches from inaccurate ETA prediction', 'High carrier costs from suboptimal routing', 'Manual exception handling slowing throughput'], solutions: ['AI dispatch agent handling 80% of routine decisions', 'Predictive ETA model trained on historical lane data', 'Dynamic carrier selection with cost optimization', 'Exception flagging with automated resolution workflows'], order: 1 },
  { tag: 'Contact Center', title: 'Voice, Chat & IVR Modernization', desc: 'We replace rigid IVR trees and slow agent workflows with conversational AI that handles routine calls end-to-end and gives live agents real-time intelligence.', bgWord: 'TALK', metric: '40%', metricLabel: 'Fewer routine agent calls', variant: 'accent', challenges: ['Legacy IVR delivering poor customer experience', 'Agents overwhelmed with repetitive routine queries', 'No visibility into call intent until after routing', 'Long handle times from manual lookup and note-taking'], solutions: ['Conversational AI handling end-to-end routine calls', 'Real-time agent assist with suggested responses', 'Intent classification before call reaches an agent', 'Automated call summarization and CRM logging'], order: 2 },
]

async function seed() {
  await connect()

  const tasks = [
    { Model: BlogPost,  name: 'blogs',        data: blogs },
    { Model: CaseStudy, name: 'case studies',  data: caseStudies },
    { Model: Service,   name: 'services',      data: services },
    { Model: Product,   name: 'products',      data: products },
    { Model: Industry,  name: 'industries',    data: industries },
  ]

  for (const { Model, name, data } of tasks) {
    const count = await Model.countDocuments()
    if (count > 0) {
      console.log(`  ${name}: already seeded (${count} docs) — skipping`)
    } else {
      await Model.insertMany(data)
      console.log(`  ✓ ${name}: seeded ${data.length} docs`)
    }
  }

  console.log('\n  Content seed complete.\n')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
