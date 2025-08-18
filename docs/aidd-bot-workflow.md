# AIDDbot in Your Workflow

> Your assistant for an AI-driven programming methodology

The **generation of professional software** using intelligent coding agents is now a reality. But how do you integrate it into your workflow?

It’s easy to prepare a **prompt** or a basic set of rules and start generating a small project or a well-known solution. But it’s not so simple when you want to generate **enterprise software**.

What if you need a system that is maintainable, scalable, and can be integrated into an existing system?

You need a **work methodology**. And a little help.

**AIDDbot** is a tool that helps you generate professional software using intelligent coding agents.

## The Current Situation

**Language models** have evolved tremendously. No matter when you read this. At the same time, programmers’ expectations and our use of AI have also grown.

In **large projects**, programming by vibes (or **vibe_coding**) is not enough. Not even with a set of rules or instructions to guide it.

As the project grows, **agents** eventually encounter challenges that are hard to solve.

## The Challenges of Development with AI

### The Scope Limited by Memory:

Knowing the specification of a **Tic-Tac-Toe** made in a mainstream framework for use as a _demo_ is one thing. But developing a hotel booking system with payment gateways, notifications, and reporting in **Angular**, integrating a legacy service in Java, a couple of databases, and a cache in Node.js is another.

It’s not easy for any language model to keep all that in mind; its **memory is limited**.

### Hallucination Due to Lack of Knowledge:
Language models are based on **searching (inferring)** the most probable answer in a context based on prior knowledge (training). This raises two problems: the validity and relevance of the training, and the degree of randomness in the response.

The result may be an answer that sounds reasonable but is not correct. A **hallucination**.

### Degradation Over Time:

Just like humans, agents start their tasks with **enthusiasm and energy**. But as time goes on, concentration and motivation (energy availability) decrease. This makes a chat with an AI agent become increasingly incoherent and random.

It needs to **start over** because it forgets the beginning of the conversation.

## The Solution: Methodology

The solution to all these problems is a **work methodology** that includes at least the following steps:

### Divide and Conquer

Divide **complex tasks** into manageable sub-tasks that can be tackled individually. This allows you to adjust the context and reduce agent fatigue. Fewer hallucinations and higher sustainable quality.

### Context Engineering

Because this is **the key** for AI agents to work **sustainably and efficiently**. Provide them with the necessary information at every moment so they can respond **coherently and reliably**.

### Guides and Guards

Maintain an up-to-date system of best practices and guardrails for common errors, for the languages, frameworks, and libraries in the versions you use. Don’t depend on outdated training, or worse, on the invention of an LLM that **doesn’t know how to say it doesn’t know**.

### Long-term memory

Starting over every time is an **unsustainable** solution. To mitigate this problem, the **file system** can be used as a long-term context and information repository. A set of files with a structure and format that allows agents to access information easily and efficiently.

## AIDDbot: Your AI Programming Assistant

> [AIDDbot repo](https://github.com/AIDDbot/AIDDbot)

And this is where **AIDDbot** comes in. It provides you with a workflow that helps you generate professional software using intelligent coding agents, optimizing the context so they work as reliably as possible.

To achieve this, a series of **steps** are established, each with a specific scope and timing. Through a system of predefined requests, a workflow is orchestrated that includes the following elements:

## Architect: Project Definition

Affects **the entire project** and takes place at the beginning. It is open to modifications and reviews, but it must lay a solid initial foundation to work from.

### PRD (Product Requirements Document)

Describes the **product requirements**. It should be short and understandable by non-technical people, but specify at least the scope of the problem and the expected solution.

### Domain Model

Defines the **domain model** of the project. That is, the entities and relationships that compose it. It helps maintain a common language and a minimum set of business rules that the data must follow.

### System Architecture

Details the **deployable components** of the solution. Includes the technology stack and the architecture of the solution.

### Feature Backlog

It is the **list of features** that must be implemented to complete the project. They can be grouped into epics or sets of user stories ordered by priority and with some control over their evolutionary state.

## Builder: Feature Implementation

Affects each of the **features in the backlog** and is done after the project definition. This stage is divided into processes that refine the feature until its implementation in source code.

### Specification

Specifies the feature as **user stories** from the stakeholders’ point of view. Includes the expected behavior in E.A.R.S. (Easy Approach to Requirements Syntax) format for later verification.

### Technical Design

Defines the **technical architecture** of the feature. Includes database design, user interface, integration with other systems, and component reuse.

### Planning

This is an **optional** step for complex features. The idea is to generate an ordered set of tasks so that an agent can execute them one by one. In some cases (simple features or very advanced agents), the design and an execution prompt indicating the need to plan before generating may be enough.

### Code Generation

Generates the **source code** for the feature, so that it meets the specification and respects the technical design. It can follow a plan or create one dynamically. Deliberately does not include the generation of tests and documentation, which are created in later steps.

## Craftsman: Feature Maintenance

Formally, it is a process that is part of the **implementation of a feature**. But we separate it to mitigate the risk of agent fatigue and the possibility that, during the same chat, they may tend to test what works, tweak code they shouldn’t, or document instead of writing good code.

By moving this task to another chat (request, agent, model), errors are prevented from accumulating and **focus** is maintained on the main task.

### Testing

Generates the **tests** for the feature, so that it can be verified that the code works as expected. If the process is complex or requires tests at different levels (unit, integration, e2e), a test plan can be generated before the tests, similar to code planning.

### Refactoring

This is an opportunity to review the generated code for **code-smells**, redundancies, or design improvements. Again, it allows the responsibility for review to be offloaded to another agent. With a fresher mind, the cleaning is better.

### Documentation

Generates the **documentation** for the feature, so that the generated code can be understood. Includes API documentation, folder structure, and integration with other systems.

## Conclusion

These **steps** will be repeated for each feature of the project until it is completed. This allows the project to stay alive and evolve, updating the _backlog_ with new features and fixing errors.

### AIDDbot

More information at [AIDDbot.com](https://aiddbot.com) and updates at [AIDDbot repo](https://github.com/AIDDbot/AIDDbot)

**AIDDbot** makes it easy to generate documentation, code, and tests, allowing you to use AI in a **sustainable and efficient** way for large, high-quality projects.

To do this, it divides the work into **temporal stages** and individual features. In between, it generates documentation that allows agents to follow the process and humans to understand it.