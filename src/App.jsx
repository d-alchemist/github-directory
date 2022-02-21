import { Link } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<main>
				<div className="container py-4">
					<header className="pb-3 mb-4 border-bottom">
						<h1 className="h4 mb-0 text-center">My GitHub Directory</h1>
					</header>
          <div className="position-relative">
            <div className="p-5 mb-4 bg-light rounded-3">
              <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Welcome 👋</h1>
                <img src="https://i.imgur.com/5f5GsU3.png" alt="astro mona" className="w-25 position-absolute top-0 end-0" />
              </div>
            </div>
          </div>
					<div className="row align-items-md-stretch">
						<div className="col-md-6">
							<div className="h-100 p-5 text-white bg-dark rounded-3">
								<h2>Users</h2>
								<p>
                  View all the users in the GitHub universe
								</p>
								<Link to="users">
									<button className="btn btn-outline-light" type="button">
										View Users
									</button>
								</Link>
							</div>
						</div>
						<div className="col-md-6">
							<div className="h-100 p-5 bg-light border rounded-3">
								<h2>Repositories</h2>
								<p>
                  View all the public repositories in GitHub
								</p>
								<Link to="repos">
									<button className="btn btn-outline-secondary" type="button">
										View Repositories
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
