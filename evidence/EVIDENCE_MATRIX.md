# Evidence Matrix

Grouped by category. Each test points to a test-specific evidence file (even if the content matches another test).

## CATEGORY 1: HAPPY PATH TESTS (Core Functionality)

| Test | Result | Endpoint | Evidence |
|---|---|---|---|
| 1 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-001_GET_repos_owner_repo_issues_200_20251210_0214ET.json` |
| 2 | PASS | `/repos/{owner}/{repo}/issues?state=open` | `evidence/raw/TEST-002_GET_repos_owner_repo_issues_state_open_200_20251210_2026ET.json` |
| 3 | PASS | `/repos/{owner}/{repo}/issues?state=closed` | `evidence/raw/TEST-003_GET_repos_owner_repo_issues_state_closed_200_20251210_2030ET.json` |
| 4 | PASS | `/repos/{owner}/{repo}/issues?state=all` | `evidence/raw/TEST-004_GET_unknown_200_20251210_2056ET.json` |
| 5 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-005_GET_repos_owner_repo_issues_1_200_20251210_2101ET.json` |
| 6 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-006_POST_repos_owner_github-api-testing_issues_201_20251212_0042ET.json` |
| 7 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-007_POST_repos_owner_repo_issues_201_20251213_0120ET.json` |
| 8 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-008_PATCH_repos_owner_repo_issues_1_200_20251213_0216ET.json` |
| 9 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-009_PATCH_repos_owner_repo_issues_1_200_20251213_0227ET.json` |
| 10 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}/comments` | `evidence/raw/TEST-010_GET_repos_owner_repo_issues_1_comments_200_20251213_0231ET.json` |

## CATEGORY 2: PARAMETER VALIDATION TESTS

| Test | Result | Endpoint | Evidence |
|---|---|---|---|
| 11 | PASS | `/repos/{owner}/{repo}/issues?per_page=10` | `evidence/raw/TEST-011_GET_repos_owner_repo_issues_per_page_10_200_20251214_2039ET.json` |
| 12 | PASS | `/repos/{owner}/{repo}/issues?per_page=5&page=2` | `evidence/raw/TEST-012_GET_unknown_200_20251214_2046ET.json` |
| 13 | PASS | `/repos/{owner}/{repo}/issues?per_page=100` | `evidence/raw/TEST-013_GET_repos_owner_repo_issues_per_page_100_200_20251214_2051ET.json` |
| 14 | PASS | `/repos/{owner}/{repo}/issues?labels=bug` | `evidence/raw/TEST-014_GET_repos_openai_codex_issues_labels_bug_200_20251214_2057ET.json` |
| 15 | PASS | `/repos/{owner}/{repo}/issues?labels=bug,extension` | `evidence/raw/TEST-015_GET_repos_openai_codex_issues_labels_type_bug_status_conf_200_20251214_2118ET.json` |
| 16 | PASS | `/repos/{owner}/{repo}/issues?assignee={username}` | `evidence/raw/TEST-016_GET_unknown_200_20251218_1604ET.json` |
| 16a | PASS | `/repos/{owner}/{repo}/issues?assignee=none` | `evidence/raw/TEST-016A_GET_unknown_200_20251218_1803ET.json` |
| 16b | PASS | `/repos/{owner}/{repo}/issues?assignee=*` | `evidence/raw/TEST-016B_GET_repos_facebook_react_issues_assignee_unknown_200_20260113_2129ET.json` |
| 17 | PASS | `/repos/{owner}/{repo}/issues?creator={username}` | `evidence/raw/TEST-017_GET_unknown_200_20251218_1808ET.json` |
| 18 | PASS | `/repos/{owner}/{repo}/issues?mentioned={username}` | `evidence/raw/TEST-018_GET_unknown_200_20251218_2247ET.json` |
| 19 | PASS | `/repos/{owner}/{repo}/issues?sort=created` | `evidence/raw/TEST-019_GET_unknown_200_20251214_2146ET.json` |
| 20 | PASS | `/repos/{owner}/{repo}/issues?sort=updated` | `evidence/raw/TEST-020_GET_repos_owner_repo_issues_sort_updated_200_20251214_2151ET.json` |
| 21 | PASS | `/repos/{owner}/{repo}/issues?sort=comments` | `evidence/raw/TEST-021_GET_repos_owner_repo_issues_sort_comments_200_20251214_2155ET.json` |
| 22 | PASS | `/repos/{owner}/{repo}/issues?sort=created&direction=asc` | `evidence/raw/TEST-022_GET_unknown_200_20251214_2158ET.json` |
| 23 | PASS | `/repos/{owner}/{repo}/issues?since=2024-01-01T00:00:00Z` | `evidence/raw/TEST-023_GET_unknown_200_20251214_2202ET.json` |
| 24 | PASS | `/repos/{owner}/{repo}/issues?milestone={milestone_number}` | `evidence/raw/TEST-024_GET_unknown_200_20251218_2346ET.json` |
| 25 | PASS | `/repos/{owner}/{repo}/issues?state=closed&labels=Type%3A%20Bug` | `evidence/raw/TEST-025_GET_repos_owner_repo_issues_state_closed_labels_type_3a_20bug_200_20251214_2209ET.json` |

## CATEGORY 3: COMMENT OPERATIONS TESTS

| Test | Result | Endpoint | Evidence |
|---|---|---|---|
| 26 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}/comments` | `evidence/raw/TEST-026_POST_repos_owner_repo_issues_2_comments_201_20251218_2351ET.json` |
| 27 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}/comments` | `evidence/raw/TEST-027_POST_repos_owner_repo_issues_2_comments_201_20251219_0357ET.json` |
| 28 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}/comments` | `evidence/raw/TEST-028_POST_repos_owner_repo_issues_2_comments_201_20251219_1555ET.json` |
| 29 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}/comments?per_page=3` | `evidence/raw/TEST-029_GET_repos_owner_repo_issues_35336_comments_per_page_3_200_20251219_1611ET.json` |
| 30 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}/comments?since=2025-12-19T00:00:00Z` | `evidence/raw/TEST-030_GET_repos_owner_repo_issues_35379_comments_since_2025-12-19t00_00_00z_200_20251219_1804ET.json` |

## CATEGORY 4: MEDIA TYPE TESTS

| Test | Result | Endpoint | Evidence |
|---|---|---|---|
| 31 | PASS | `/repos/facebook/react/issues/1` | `evidence/raw/TEST-031_GET_unknown_200_20251220_0319ET.json` |
| 32 | PASS | `/repos/facebook/react/issues/1` | `evidence/raw/TEST-032_GET_unknown_200_20251220_0323ET.json` |
| 33 | PASS | `/repos/facebook/react/issues/1` | `evidence/raw/TEST-033_GET_unknown_200_20251220_0325ET.json` |
| 34 | PASS | `/repos/facebook/react/issues/1` | `evidence/raw/TEST-034_GET_unknown_200_20251220_0327ET.json` |
| 35 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-035_GET_unknown_404_20251220_0334ET.json` |
| 36 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-036_GET_repos_owner_nonexistentrepo123456_issues_404_20251220_0339ET.json` |
| 37 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-037_POST_repos_owner_repo_issues_422_20251220_0341ET.json` |
| 37a | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-037A_POST_repos_owner_repo_issues_401_20251220_0346ET.json` |
| 38 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-038_POST_repos_owner_repo_issues_422_20251220_0348ET.json` |
| 39 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}/comments` | `evidence/raw/TEST-039_POST_repos_owner_repo_issues_2_comments_422_20251220_0352ET.json` |
| 40 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-040_PATCH_repos_owner_repo_issues_999999_404_20251220_0355ET.json` |
| 41 | PASS | `/repos/{owner}/{repo}/issues?state=invalid` | `evidence/raw/TEST-041_GET_unknown_422_20251220_0359ET.json` |
| 42 | PASS | `/repos/{owner}/{repo}/issues?sort=invalid` | `evidence/raw/TEST-042_GET_unknown_200_20251220_0402ET.json` |

## CATEGORY 6: EDGE CASES & BOUNDARIES

| Test | Result | Endpoint | Evidence |
|---|---|---|---|
| 43 | PASS | `/repos/{owner}/{repo}/issues?per_page=150` | `evidence/raw/TEST-043_GET_unknown_200_20251220_0413ET.json` |
| 44 | PASS | `/repos/{owner}/{repo}/issues?per_page=0` | `evidence/raw/TEST-044_GET_unknown_200_20251220_0420ET.json` |
| 45 | PENDING | `/repos/{owner}/{repo}/issues?per_page=-5` | `evidence/raw/TEST-045_GET_unknown_200_20251220_0424ET.json` |
| 46 | PASS | `/repos/{owner}/{repo}/issues?page=0` | `evidence/raw/TEST-046_GET_unknown_200_20251220_0429ET.json` |
| 47 | PASS | `/repos/{owner}/{repo}/issues?page=9999` | `evidence/raw/TEST-047_GET_unknown_422_20251220_0431ET.json` |
| 52 | PENDING | `/repos/{owner}/{repo}/issues?labels=nonexistentlabel123` | `evidence/raw/TEST-052_POST_repos_owner_repo_issues_201_20260106_1605ET.json` |
| 53 | PENDING | `/repos/{owner}/{repo}/issues?assignee=nonexistentuser999` | `evidence/raw/TEST-053_POST_repos_owner_repo_issues_201_20260106_1617ET.json` |
| 54 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-054_POST_repos_owner_repo_issues_201_20260106_1605ET_01f3c1.json` |
| 55 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-055_POST_repos_owner_repo_issues_201_20260106_1617ET_236c56.json` |
| 58 | PENDING | `/repos/{owner}/{repo}/issues/{pr_number}` | `evidence/raw/TEST-058_PATCH_repos_owner_repo_issues_2_200_20260106_1717ET.json` |
| 59 | PENDING | `/repos/{owner}/{repo}/issues/{pr_number}` | `evidence/raw/TEST-059_PATCH_unknown_200_20260106_1721ET.json` |

## CATEGORY 8: STATE TRANSITION TESTS

| Test | Result | Endpoint | Evidence |
|---|---|---|---|
| 60 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-060_PATCH_repos_owner_repo_issues_2_200_20260106_1717ET_601f9e.json` |
| 61 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-061_PATCH_unknown_200_20260106_1721ET_52e6e1.json` |
| 62 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-062_PATCH_repos_owner_repo_issues_1_200_20260106_1724ET.json` |
| 63 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-063_PATCH_repos_owner_repo_issues_1_200_20260106_1728ET.json` |
| 65 | PENDING | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-065_PATCH_repos_owner_repo_issues_4_403_20260106_1733ET.json` |
| 66 | PENDING | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-066_PATCH_repos_owner_repo_issues_4_403_20260106_1733ET.json` |
| 67 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-067_PATCH_repos_owner_repo_issues_4_403_20260106_1733ET_67cb66.json` |
| 69 | PASS | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | `evidence/raw/TEST-069_GET_unknown_200_20260104_1809ET.json` |
| 70 | PASS | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | `evidence/raw/TEST-070_PATCH_repos_owner_repo_issues_comments_3673471450_200_20260104_1815ET.json` |
| 71 | PASS | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | `evidence/raw/TEST-071_DELETE_repos_owner_repo_issues_comments_3673471450_204_20260104_1821ET.json` |
| 72 | PASS | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | `evidence/raw/TEST-072_GET_unknown_404_20260104_1823ET.json` |
| 73 | PASS | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | `evidence/raw/TEST-073_PATCH_repos_owner_repo_issues_comments_3673471450_404_20260104_1825ET.json` |
| 74 | PASS | `/repos/{owner}/{repo}/issues/comments/{comment_id}` | `evidence/raw/TEST-074_DELETE_repos_owner_repo_issues_comments_3673471450_404_20260104_1831ET.json` |
| 75 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-075_PATCH_repos_owner_repo_issues_2_200_20260106_1707ET.json` |
| 76 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-076_PATCH_repos_owner_repo_issues_2_200_20260106_1653ET.json` |
| 77 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-077_GET_repos_owner_repo_issues_sort_not_a_real_sort_direction_desc_per_page_5_pag_200_20260106_1657ET.json` |
| 78 | PASS | `/repos/{owner}/{repo}/issues` | `evidence/raw/TEST-078_GET_unknown_200_20260106_1756ET.json` |
| 79 | PASS | `/repos/{owner}/{repo}/issues/{issue_number}` | `evidence/raw/TEST-079_GET_unknown_422_20260106_1809ET.json` |
| V1 | FAIL | `` | `evidence/raw/TEST-V1_GET_repos_owner_repo_issues_sort_invalid_direction_asc_200_20260112_1539ET.json` |
| V2 | PASS | `` | `evidence/raw/TEST-V2_GET_repos_owner_repo_issues_per_page_150_200_20260112_1539ET.json` |
| V3 | PASS | `` | `evidence/raw/TEST-V3_GET_repos_owner_repo_issues_per_page_0_200_20260112_1539ET.json` |
| V4 | PASS | `` | `evidence/raw/TEST-V4_GET_repos_owner_repo_issues_per_page_-5_200_20260112_1539ET.json` |
