# Crap findings

A project without a `crap` command has nothing to harden.

Record one `low` item for each rule. The test coverage is one rule too. Put each place of the rule in the evidence: one repair fixes all its places.

Sometimes a rule is a false alarm for a project, such as a pattern that its framework requires. Then write in the evidence that the repair disables the rule in the configuration of that project. Never disable it with a comment in each place.
